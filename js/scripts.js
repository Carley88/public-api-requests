const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');


fetch("https://randomuser.me/api/?results=1&nat=us")
  .then(response => response.json())
  .then(data => {
    const employees = data.results
    employees.forEach((employee) => {
      generateGallery(employee);
      generateModal(employee);
    });
    // const cards = document.querySelectorAll(".card");
    // cards.forEach(card => {
    //   card.addEventListener('click', (event) => {
    //     console.log(event.target);
    //     console.log(event.currentTarget.id);
    //   })
    // })
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
  const modalHTML = `
    <div class="modal-container">
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
    </div>`
  cards[0].insertAdjacentHTML('beforeEnd', modalHTML);
}

const dob = "1946-05-18T09:31:27.640Z";
const regex = /^(\d{4})-(\d{2})-(\d{2})*/;
console.log(dob.replace(/\T(.*)$/, '').replace(regex, '$2/$3/$1'));
