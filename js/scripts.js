fetch("https://randomuser.me/api/")
  .then(response => response.json())
  .then(data => {
    const employeeData = data.results[0]
    const gallery = document.getElementById('gallery');

    const galleryHTML = `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src=${employeeData.picture.medium} alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${employeeData.name.first} ${employeeData.name.last}</h3>
              <p class="card-text">${employeeData.email}</p>
              <p class="card-text cap">${employeeData.location.city}, ${employeeData.location.country}</p>
          </div>
      </div>`

    gallery.insertAdjacentHTML('beforeEnd', galleryHTML);
  });
