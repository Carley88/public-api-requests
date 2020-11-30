const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');

/**
API request fetches back 12 random people & their details from randomuser.me.
I have filtered to only use US residents to make the formatting of my page simpler.
Once the API has responded the generateGallery, generateModal, clickListeners and
generateSearchBar functions are called.
**/
fetch("https://randomuser.me/api/?results=12&nat=us")
  .then(response => response.json())
  .then(data => {
    const employees = data.results
    employees.forEach((employee) => {
      generateGallery(employee);
      generateModal(employee);
    });
    clickListeners();
    generateSearchBar();
});

/**
The generateModal function creates a card for each employee and then the data from
the API request is used to populate the cards.
**/
function generateGallery(data){
  const galleryHTML = `
    <div id=${data.name.first}-${data.name.last} class="card">
        <div class="card-img-container">
            <img class="card-img" src=${data.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.country}</p>
        </div>
    </div>`;

  gallery.insertAdjacentHTML('beforeEnd', galleryHTML);
}

/**
The generateModal function creates a window for each employee with further details
by using the data from the API request. RegEx is used to format the DOB to
the American format. All of the windows are hidden & will be displayed individually
when a user clicks on that employee's card.
**/
function generateModal(data){
  const dobRaw = data.dob.date;
  const timestampRegEx = /\T(.*)$/
  const dateRegEx = /^(\d{4})-(\d{2})-(\d{2})*/
  const dobFormatted = dobRaw.replace(timestampRegEx, '').replace(dateRegEx, '$2/$3/$1');
  const modal = document.createElement('div');
  modal.className = 'modal-container';
  gallery.appendChild(modal);
  const modalHTML = `
      <div class="modal">
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
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      </div>`;
  modal.insertAdjacentHTML('beforeEnd', modalHTML);
  modal.style.display = 'none';
}

/**
The clickListeners function firstly listens to which employee the user clicks on
and brings up the detailed window for that employee.
Once the window is open the click listener listens to the next & previous buttons
and changes to the next/previous employee in the list. When at the start or end of
the list the previous/next button is hidden.
**/
function clickListeners() {
  const cards = document.getElementsByClassName("card");
  const modals = document.getElementsByClassName("modal-container");
  const buttons = document.getElementsByClassName('modal-btn-container');
  const prevButtons = document.getElementsByClassName('modal-prev');
  prevButtons[0].style.display = 'none';
  const nextButtons = document.getElementsByClassName('modal-next');
  nextButtons[nextButtons.length - 1].style.display = 'none';
  for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
      modals[i].style.display = '';
    });
    buttons[i].addEventListener('click', (event) => {
      if(event.target.className != 'modal-btn-container') {
        if(event.target.className === 'modal-close-btn' || event.target.parentNode.className === 'modal-close-btn') {
          modals[i].style.display = 'none';
        } else if (event.target.className === 'modal-prev btn') {
          modals[i].style.display = 'none';
          modals[i-1].style.display = '';
        } else if (event.target.className === 'modal-next btn') {
          modals[i].style.display = 'none';
          modals[i+1].style.display = '';
        }
      }
    })
  }
}

/**
The generateSearchBar function creates a search bar in the top right hand corner.
As the user types a word any employee's name who doesn't contain the letter sequence
will be hidden from the page.
**/
function generateSearchBar() {
  const searchHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
  const searchDiv = document.querySelector('.search-container');
  searchDiv.insertAdjacentHTML('beforeEnd', searchHTML);

  const searchInput = document.getElementById('search-input');

  searchDiv.addEventListener('keyup', (event) => {
    event.preventDefault();
    const input = searchInput.value.toLowerCase();

    for(let i = 0; i < cards.length; i++) {
      const employeeName = cards[i].id.replace(/-/, ' ').toLowerCase();
      if(employeeName.includes(input)) {
        cards[i].style.display = '';
      } else if (employeeName.includes(input) === false) {
        cards[i].style.display = 'none';
      } else {
        cards[i].style.display = '';
      }
    }
  })
}
