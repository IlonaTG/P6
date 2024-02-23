const log = document.querySelector('.log');
const banner = document.querySelector('.edition-banner');
const modif = document.querySelector('.mesProjets-changing');
const container = document.querySelector('.edition-container');
const filtres = document.querySelector('.filters');


function editionActive() {
  if (localStorage.login) {
    (log.innerText = 'logout'), (banner.style = 'display:flex;');
    filtres.style = 'display:none';
  } else {
    banner.style = 'display:none;';
    modif.style = 'display:none;';
    container.style = 'display:none';
  }
}
editionActive();

log.addEventListener('click', (e) => {
  const token = localStorage.getItem('token');
  if (token) {
    e.preventDefault();
    window.location.reload();
  }
  localStorage.removeItem('login');
  localStorage.removeItem('token');
  log.innerText = 'login';
  localStorage.clear();
});




