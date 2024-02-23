//Ajouter une image en preview
const uploadButton = document.querySelector(".upload-btn");
const faImageIcon = document.querySelector('.fa-image')
const fileInput = document.createElement('input');// Création de l'élément input de type file
fileInput.type = 'file';
fileInput.accept = 'image/jpeg, image/png';
fileInput.id = 'addPic';

uploadButton.addEventListener('click', async () => {
  try {
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      const maxFileSize = 4 * 1024 * 1024;

      if (file.size > maxFileSize) {
        alert("La taille de l\'image dépasse 4 Mo. Veuillez sélectionner une image plus petite.");
        return;
      }
      // Afficher l'aperçu de l'image sélectionnée
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        imagePreview.innerHTML = ''; 
        imagePreview.appendChild(image);
       
        uploadButton.style.display = 'none';
        faImageIcon.style.display = 'none';
      };
      reader.readAsDataURL(file);
    });
    fileInput.click();
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
});