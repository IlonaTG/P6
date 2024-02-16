const itemsContainer = document.querySelector(".gallery");
// Appel à l'API avec fetch
fetch("http://localhost:5678/api/works/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const caption = document.createElement("figcaption");
      image.src = work.imageUrl;
      caption.textContent = work.title;
      //Ajouter l'image a la gallerie
      itemsContainer.appendChild(figure);
      figure.appendChild(image);
      figure.appendChild(caption);
    });
  });
  

// Fonction pour ajouter les travaux à la galerie
async function afficherToutesLesImages() {
  itemsContainer.innerHTML = ""; // Effacer les éléments actuels dans le conteneur
  // Une requête Fetch pour obtenir les données de l'API
  const response = await fetch("http://localhost:5678/api/works/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(element => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const caption = document.createElement("figcaption");
      image.src = element.imageUrl;
      caption.textContent = element.title;

      figure.appendChild(image);
      figure.appendChild(caption);
      itemsContainer.appendChild(figure);
      });
  });
};



// Fonction de tri par catégorie
async function trierParCategorie(categorie) {
    itemsContainer.innerHTML = "";
    // Une requête Fetch pour obtenir les données de l'API
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
          const caption = document.createElement("figcaption");
          image.src = element.imageUrl;
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