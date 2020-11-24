const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');

fetch("https://randomuser.me/api/?results=12")
  .then(response => response.json())
  .then(data => {
    const employees = data.results
    employees.forEach((employee) => {
      generateGallery(employee);
      generateModal(employee);
    });
    const cards = document.getElementsByClassName("card");
    const modals = document.getElementsByClassName("modal-container");
    const closeButtons = document.getElementsByClassName('modal-close-btn');
    const nextButtons = document.getElementsByClassName('modal-next');
    const prevButtons = document.getElementsByClassName('modal-prev');
    for(let i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', () => {
        modals[i].style.display = '';
        closeButtons[i].addEventListener('click', () => {
          modals[i].style.display = 'none';
        })
      });
    }
});

function generateGallery(data){
  const galleryHTML = `
    <div id=${data.login.md5} class="card">
        <div class="card-img-container">
            <img class="card-img" src=${data.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.country}</p>
        </div>
    </div>`

  gallery.insertAdjacentHTML('beforeEnd', galleryHTML);
}

function generateModal(data){
  const dobRaw = data.dob.date
  const timestampRegEx = /\T(.*)$/
  const dateRegEx = /^(\d{4})-(\d{2})-(\d{2})*/
  const dobFormatted = dobRaw.replace(timestampRegEx, '').replace(dateRegEx, '$2/$3/$1')
  const modal = document.createElement('div');
  modal.className = 'modal-container';
  modal.dataset.id = data.login.md5;
  gallery.appendChild(modal);
  const modalHTML = `
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src=${data.picture.large} alt="profile picture">
              <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
              <p class="modal-text">${data.email}</p>
              <p class="modal-text cap">${data.location.city}</p>
              <hr>
              <p class="modal-text">${data.phone}</p>
              <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.state}, ${data.location.postcode}</p>
              <p class="modal-text">Birthday: ${dobFormatted}</p>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>`
  modal.insertAdjacentHTML('beforeEnd', modalHTML);
  modal.style.display = 'none';
}
