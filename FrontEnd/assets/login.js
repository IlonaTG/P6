
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    identification();
  });
  //Fonction qui se declenche au click du boutton//
  async function identification() {
    const mail = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
        //On envoie la requete POST à l'API
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: mail,
          password: password,
        }),
      });
      
      if (response.ok) {
        //Création du token d'identification//
        const userData = await response.json();
        //Enregistrement du token dans le local storage//
        localStorage.setItem("token", userData.token);
        localStorage.setItem("login", true);
        //Si l'indentification est réussie la page d'acceuil s'affiche
        window.location.href = "./index.html";
      } 
      //Si l'identification est incorrect une alerte s'affiche//
      else {
        localStorage.setItem("token", undefined);
        localStorage.setItem("login", undefined);
        alert("La combinaison e-mail/mot de passe est incorrecte.");
      }
    } 
    //Si une erreur se produit on la voit dans la console
    catch (e) {
      console.error("An error occurred", e);
      console.error("Error message", e.message);
    }
  }


  
 
  