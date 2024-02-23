// Ajouter une image dans la galerie
const validateButton = document.querySelector('.validate-btn');
validateButton.addEventListener('click', async () => {
  try {
    // Récupérer le fichier à partir de l'élément input de type file
    const file = fileInput.files[0];
    if (!file) {
      alert("Veuillez d\'abord ajouter une image.");
      return;
    }
    // Récupérer le titre et la catégorie de l'image
    const photoTitle = document.querySelector('.photo-title').value;
    const photoCategory = document.querySelector('.photo-category').value;
    // Vérifier si les champs titre et catégorie sont remplis
    if (!photoTitle.trim() || !photoCategory.trim()) {
      alert("Le titre et la catégorie sont obligatoires. Veuillez les remplir!");
      return;
    }
    // Créer un objet FormData et y ajouter les données
    const formData = new FormData();
    formData.append('image', file); 
    formData.append('title', photoTitle);
    formData.append('category', photoCategory);
   
    const token = localStorage.getItem('token');

    // Envoyer la requête POST au serveur avec les données de l'image
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      // Mettre à jour l'aperçu dans le premier modal
      const imagePreviewFirstModal = document.querySelector('.modal-wrapper__first .image-container');
      const newImage = document.createElement('img');
      newImage.src = URL.createObjectURL(file); 
      imagePreviewFirstModal.appendChild(newImage);
      document.querySelector('.photo-title').value = '';
      document.querySelector('.photo-category').value = '';

      afficherToutesLesImages();
      afficherToutesLesImagesModal();
      reinitialiserApercuImage();

      if (imageUploadElements) {
        imageUploadElements.forEach((element) => {
          element.style.display = 'block';
        });
      }
    } else {
      console.error('Erreur lors de l\'ajout de l\'image:', response.status);
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la validation de l\'image :', error);
  }
});