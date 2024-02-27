const modifierLink = document.querySelector('.mesProjets-changing');
const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.querySelectorAll('.fa-xmark');
const imageContainer = document.querySelector('.image-container');
const editionBanner = document.querySelector('.edition-banner')

// Ouvrir le modal au clic sur le lien "Modifier"
modifierLink.addEventListener('click', () => {
    modalContainer.style.display = 'block'; 
    afficherToutesLesImagesModal();
});

// Ouvrir le modal au clic sur Edition-banner
editionBanner.addEventListener('click',() => {
  modalContainer.style.display = 'block'; 
    afficherToutesLesImagesModal();
});


// Fonction pour afficher toutes les images dans le modal
async function afficherToutesLesImagesModal() {
    imageContainer.innerHTML = ''; 
    try {
      // Une requête Fetch pour obtenir les données de l'API
      const response = await fetch('http://localhost:5678/api/works/');
      const data = await response.json();
  
      // Création des éléments image avec l'icône de suppression
      data.forEach((element) => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const deleteIcon = document.createElement('i');
        figure.classList.add('gallery-item');
        image.src = element.imageUrl;
        deleteIcon.classList.add('fa-solid', 'fa-trash-can');
        deleteIcon.addEventListener('click', () => deleteWorks(element.id));
  
        figure.appendChild(image);
        figure.appendChild(deleteIcon);
        imageContainer.appendChild(figure);
      });
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  }
  afficherToutesLesImagesModal();


// Sélection de la première et de la deuxième modale
const firstModal = document.querySelector('.modal-wrapper__first');
const secondModal = document.querySelector('.modal-wrapper__second');
const addPhotoButton = document.querySelector('.image-add__button');
const arrowLeftIcon = document.querySelector('.fa-arrow-left');
const imageUploadElements = document.querySelectorAll('.fa-image, .upload-btn');
const imagePreview = document.querySelector('.image-preview')

function reinitialiserApercuImage() {
  imagePreview.innerHTML = ''; // Réinitialiser l'aperçu de l'image
}

// Fonction pour afficher les éléments d'upload
function afficherElementsUpload() {
  uploadElements.forEach(element => {
      element.style.display = 'block'; // Afficher les éléments d'upload
  });
}

// Écouteur d'événement pour ouvrir le deuxième modal et fermer le premier
addPhotoButton.addEventListener('click', function() {
  firstModal.style.display = 'none';
  secondModal.style.display = 'flex';
});

// Écouteur d'événement pour revenir à la première modal en cliquant sur .fa-arrow-left
arrowLeftIcon.addEventListener('click', function() {
  secondModal.style.display = 'none';
  firstModal.style.display = 'flex'; 
  // Réinitialiser l'aperçu de l'image
  reinitialiserApercuImage();
  // Réinitialiser les champs titre et catégorie
  document.querySelector('.photo-title').value = '';
  document.querySelector('.photo-category').value = '';
  // Afficher les éléments d'upload d'image
  if (imageUploadElements) {
    imageUploadElements.forEach((element) => {
      element.style.display = 'block';
    });
  }
});

// Fonction pour fermer le modal en cliquant dehors de la modal
function fermerModal(event) {
  if (event.target === modalContainer) {
      modalContainer.style.display = 'none';
      reinitialiserApercuImage();
      afficherElementsUpload(); 
      document.querySelector('.photo-title').value = '';
document.querySelector('.photo-category').value = '';
}
}
window.addEventListener('click', fermerModal);

// Ajout d'un écouteur d'événements pour fermer le modal en cliquant sur la croix
closeModalBtn.forEach((btnClose) => {
btnClose.addEventListener('click', () => {
modalContainer.style.display = 'none';
reinitialiserApercuImage(); 
afficherElementsUpload(); 
document.querySelector('.photo-title').value = '';
document.querySelector('.photo-category').value = '';
});
});


const uploadElements = document.querySelectorAll('.fa-image, .upload-btn');
// Fonction pour cacher les éléments upload lorsque l'aperçu de l'image est affiché
function cacherElementsUpload() {
  if (imagePreview.innerHTML !== '') {     
    uploadElements.forEach(element => {
      element.style.display = 'none'; 
    });
  } else {
    uploadElements.forEach(element => {
      element.style.display = 'block';    
    });
  }
}





