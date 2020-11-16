const gallery = document.getElementById('gallery');

fetch("https://randomuser.me/api/?results=12")
  .then(response => response.json())
  .then(data => {
    const employees = data.results
    employees.forEach((employee) => {
      generateGallery(employee)
    });
  });

function generateGallery(data){
  const galleryHTML = `
    <div class="card">
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
