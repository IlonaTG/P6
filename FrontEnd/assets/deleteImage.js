//Fonction pour supprimer des images
async function deleteWorks(workId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
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
        afficherToutesLesImagesModal();
      } else {
        console.error("Erreur lors de la suppression de l'image");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de suppression", error);
    }
  }