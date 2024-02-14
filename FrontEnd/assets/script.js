

const gallery = document.querySelector(".gallery");

// Appel à l'API avec fetch
fetch("http://localhost:5678/api/works/")
  .then((response) => response.json())
  .then((data) => {
    // Manipulation des données récupérées (work)
    data.forEach((work) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = work.imageUrl;
      const caption = document.createElement("figcaption");
      caption.textContent = work.title;
      //Ajouter l'image a la gallerie
      gallery.appendChild(figure);
      figure.appendChild(image);
      figure.appendChild(caption);
      });
    });
  
    


const itemsContainer = document.querySelector(".gallery");

  // Fonction pour ajouter les travaux à la galerie
async function afficherToutesLesImages() {
  itemsContainer.innerHTML = "";
      
  // Une requête Fetch pour obtenir les données de l'API
  const response = await fetch("http://localhost:5678/api/works/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(element => {
      const figure = document.createElement("figure");
      // Créer une image pour le projet
      const image = document.createElement("img");
      image.src = element.imageUrl;
              
      // Créer un nom pour afficher le nom du projet
      const caption = document.createElement("figcaption");
      caption.textContent = element.title;
         
      figure.appendChild(image);
      figure.appendChild(caption);
      itemsContainer.appendChild(figure);
      });
  });
};

// Fonction de tri par catégorie
async function trierParCategorie(categorie) {
  // Effacer les éléments actuels dans le conteneur
  itemsContainer.innerHTML = "";

  // Effectuer une requête Fetch pour obtenir les données de l'API
  const response = await fetch("http://localhost:5678/api/works/")
    .then((response) => response.json())
    .then((data) => {
      // Filtrer les éléments en fonction de la catégorie sélectionnée
      const elementsFiltres = data.filter(
        (element) => element.category.name === categorie
      );

      // Parcourir les éléments filtrés et les ajouter au conteneur
      elementsFiltres.forEach((element) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = element.imageUrl;
        const caption = document.createElement("figcaption");
        caption.textContent = element.title;

        figure.appendChild(image);
        figure.appendChild(caption);
        itemsContainer.appendChild(figure);
      });
    });
}
trierParCategorie();

// Ajouter des écouteurs d'événements pour les boutons de tri
const tousBtn = document.createElement("button");
tousBtn.textContent = "Tous";
tousBtn.addEventListener("click", afficherToutesLesImages);
document.querySelector(".filters").appendChild(tousBtn);

const objetsBtn = document.createElement("button");
objetsBtn.textContent = "Objets";
objetsBtn.addEventListener("click", () => trierParCategorie("Objets"));
document.querySelector(".filters").appendChild(objetsBtn);

const appartementsBtn = document.createElement("button");
appartementsBtn.textContent = "Appartements";
appartementsBtn.addEventListener("click", () => trierParCategorie("Appartements"));
document.querySelector(".filters").appendChild(appartementsBtn);

const hotelsBtn = document.createElement("button");
hotelsBtn.textContent = "Hotels & restaurants";
hotelsBtn.addEventListener("click", () => trierParCategorie("Hotels & restaurants"));
document.querySelector(".filters").appendChild(hotelsBtn);



//Les changement en mode logIn
const log = document.querySelector(".log");
const banner = document.querySelector(".edition-banner");
const modif = document.querySelector(".mesProjets-changing");
const container = document.querySelector(".edition-container");
const filtres = document.querySelector(".filters");


function editionActive() {
  if (localStorage.login) {
    (log.innerText = "logout"), (banner.style = "display:flex;");
    filtres.style = "display:none";
  } else {
    banner.style = "display:none;";
    modif.style = "display:none;";
    container.style = "display:none";
  }
}
editionActive();

log.addEventListener("click", () => {
  localStorage.removeItem("login");
  localStorage.removeItem("token");
  log.innerText = "login";
  localStorage.clear();
  }
);

// Stocker les informations d'authentification et rediriger

const auth = JSON.parse(localStorage.getItem('auth'));
if (auth && auth.token) {
  window.location = "index.html";
} 

      

// Sélection du lien "Modifier"
const modifierLink = document.querySelector('.mesProjets-changing');

// Sélection du modal et de ses éléments
const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.querySelector('.fa-xmark');
const imageContainer = document.querySelector('.image-container');

// Ajout d'un écouteur d'événements pour ouvrir le modal au clic sur le lien "Modifier"
modifierLink.addEventListener('click', () => {
    modalContainer.style.display = 'block'; // Afficher le modal
    afficherToutesLesImages(); // Afficher les images dans le modal (fonction déjà définie)
});

// Ajout d'un écouteur d'événements pour fermer le modal en cliquant sur la croix
closeModalBtn.addEventListener('click', () => {
  modalContainer.style.display = 'none'; // Cacher le modal
});





// Fonction pour afficher toutes les images dans le modal
async function afficherToutesLesImagesModal() {
    imageContainer.innerHTML = ''; // Effacer le contenu actuel du modal

    try {
      // Une requête Fetch pour obtenir les données de l'API
      const response = await fetch('http://localhost:5678/api/works/');
      const data = await response.json();
  
      // Création des éléments image avec l'icône de suppression
      data.forEach((element) => {
        const figure = document.createElement('figure');
        figure.classList.add('gallery-item'); // Ajout d'une classe pour la manipulation ultérieure
        const image = document.createElement('img');
        image.src = element.imageUrl;
  
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash-can');
        deleteIcon.addEventListener('click', () => deleteWorks(element.id)); // Gestionnaire d'événements pour la suppression
  
        figure.appendChild(image);
        figure.appendChild(deleteIcon);
        imageContainer.appendChild(figure);
      });
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  }
  afficherToutesLesImagesModal();


  async function deleteWorks(workId) {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Supprimer l'élément de la galerie principale
        const galleryItem = document.querySelector(`[data-work-id="${workId}"]`);
        if (galleryItem) {
          galleryItem.remove();
        }
  
        // Mettre à jour la galerie principale
        await afficherToutesLesImages();
      } else {
        console.error("Erreur lors de la suppression de l'image");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de suppression", error);
    }
  }

  
    



// Sélection de la première et de la deuxième modale
const firstModal = document.querySelector(".modal-wrapper__first");
const secondModal = document.querySelector(".modal-wrapper__second");
const addPhotoButton = document.querySelector(".image-add__button");
const arrowLeftIcon = document.querySelector(".fa-arrow-left");




// Écouteur d'événement pour ouvrir le deuxième modal et fermer le premier
addPhotoButton.addEventListener("click", function() {
  firstModal.style.display = "none"; // Cacher le premier modal
  secondModal.style.display = "flex"; // Afficher le deuxième modal
});

// Écouteur d'événement pour revenir à la première modal en cliquant sur .fa-arrow-left
arrowLeftIcon.addEventListener("click", function() {
  secondModal.style.display = "none"; // Cacher le deuxième modal
  firstModal.style.display = "flex"; // Afficher le premier modal

  // Réinitialiser l'aperçu de l'image
  imagePreview.innerHTML = '';
  
 
  // Afficher les éléments d'upload d'image
  const imageUploadElements = document.querySelectorAll('.fa-image, .upload-btn');
  if (imageUploadElements) {
    imageUploadElements.forEach((element) => {
      element.style.display = 'block';
    });
  }
});




// Fonction pour fermer le modal en cliquant dehors de la modal
function fermerModal(event) {
    if (event.target === modalContainer) {
        modalContainer.style.display = 'none'; // Cacher le modal si le clic est en dehors de celui-ci
    }
}
// Ajout d'un gestionnaire d'événements pour fermer le modal lors d'un clic en dehors de celui-ci
window.addEventListener('click', fermerModal);




const imagePreview = document.querySelector('.image-preview');
const uploadElements = document.querySelectorAll('.fa-image, .upload-btn');
// Fonction pour cacher les éléments lorsque l'aperçu de l'image est affiché
function cacherElementsUpload() {
  // Vérifier si l'aperçu de l'image est affiché
  if (imagePreview.innerHTML !== '') {
    uploadElements.forEach(element => {
      element.style.display = 'none'; // Masquer les éléments d'upload
    });
  } else {
    uploadElements.forEach(element => {
      element.style.display = 'block'; // Afficher les éléments d'upload si l'aperçu n'est pas affiché
    });
  }
}


const uploadButton = document.querySelector(".upload-btn");


// Créer l'élément input de type file une seule fois en dehors des fonctions de gestionnaire d'événements
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/jpeg, image/png'; // Accepter seulement les fichiers JPEG et PNG
fileInput.id = 'addPic';

// Ajouter l'écouteur d'événements pour le bouton d'envoi
uploadButton.addEventListener('click', async () => {
  try {
    // Ajouter l'écouteur d'événement pour le changement de fichier
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      const maxFileSize = 4 * 1024 * 1024; // Taille maximale en octets (4 Mo)

      if (file.size > maxFileSize) {
        alert('La taille de l\'image dépasse 4 Mo. Veuillez sélectionner une image plus petite.');
        return; // Arrêter l'exécution si la taille dépasse la limite
      }

      // Afficher l'aperçu de l'image sélectionnée
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        imagePreview.innerHTML = ''; // Effacer l'aperçu précédent
        imagePreview.appendChild(image); // Afficher l'aperçu de l'image
      };
      reader.readAsDataURL(file);
    });

    fileInput.click(); // Simuler un clic sur le fileInput pour ouvrir la boîte de dialogue de sélection de fichiers
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
});

// Récupérer le bouton de validation
const validateButton = document.querySelector('.validate-btn');

// Ajouter l'écouteur d'événements pour le bouton de validation
validateButton.addEventListener('click', async () => {

  try {
    // Récupérer le fichier à partir de l'élément input de type file
    const file = fileInput.files[0];

    if (!file) {
      alert('Veuillez d\'abord ajouter une image.');
      return;
    }

    // Récupérer le titre et la catégorie de l'image
    const photoTitle = document.querySelector('.photo-title').value;
    const photoCategory = document.querySelector('.photo-category').value;

    // Créer un objet FormData et y ajouter les données
    const formData = new FormData();
    formData.append("image", file); // Ajouter le fichier image à FormData
    formData.append("title", photoTitle); // Ajouter le titre à FormData
    formData.append("category", photoCategory); // Ajouter la catégorie à FormData

    // Récupérer le token d'authentification
    const token = localStorage.getItem('token');

    // Envoyer la requête POST au serveur avec les données de l'image
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {


      // Mettre à jour l'aperçu dans le premier modal
      const imagePreviewFirstModal = document.querySelector('.modal-wrapper__first .image-container');
      const newImage = document.createElement('img');
      newImage.src = URL.createObjectURL(file); // Utilisez l'URL créée à partir du fichier
      imagePreviewFirstModal.appendChild(newImage);

      // Actualiser la galerie principale
      afficherToutesLesImages();
    } else {
      console.error('Erreur lors de l\'ajout de l\'image:', response.status);
      // Gérer les erreurs d'ajout d'image, par exemple afficher un message d'erreur à l'utilisateur
    }

    // Une fois l'opération terminée, vous pouvez fermer la deuxième modal et afficher la première modal
    const firstModal = document.querySelector('.modal-wrapper__first');
    const secondModal = document.querySelector('.modal-wrapper__second');
    firstModal.style.display = 'flex'; // Afficher la première modal
    secondModal.style.display = 'none'; // Cacher la deuxième modal
    afficherToutesLesImagesModal(); // Actualiser la galerie avec la nouvelle image
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la validation de l\'image :', error);
  }
});