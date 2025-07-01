//Mettre le code JavaScript lié à la page photographer.html
// get photographer data (info and media)
async function getPhotographer() {
  // get photographers data
  const response = await fetch("../data/photographers.json");
  const photographersData = await response.json();
  console.log("Les données des photographes:", photographersData);
  // get photographer id from urlParams
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  console.log("photographe id:", id);
  // get photographer data
  const photographer = photographersData.photographers.filter(
    (photographer) => photographer.id === id
  );
  const info = photographer[0];
  const media = photographersData.media
    .filter((media) => media.photographerId === id)
    .reverse();
  return { info, media };
}

// Function to display data using the factory pattern
async function displayData(info, media) {
  const photographerHeader = document.querySelector(".header-photographer");

  // Show header
  const photographerPage = headerTemplate(info);
  const headerArticleDOM = photographerPage.getUserHeaderArticleDOM();
  const headerImageDOM = photographerPage.getUserHeaderImageDOM();
  photographerHeader.insertBefore(
    headerArticleDOM,
    photographerHeader.firstChild
  );
  photographerHeader.appendChild(headerImageDOM);

  //show filter
  const sectionFilter = filterTemplate(media);
  const filterDOM = sectionFilter.getUserFilterDOM();
  const main = document.getElementById("main");
  main.appendChild(filterDOM);

  // Show media
  const sectionMedia = document.createElement("section");
  sectionMedia.classList.add("section-medias");
  console.log("Initial media array:", media);
  media.forEach((mediaItem) => {
    const mediaElement = MediaFactory.createMedia(info, mediaItem);
    console.log("this is", mediaItem);
    const articleMediaDOM = mediaElement.getUserMediaDOM();
    sectionMedia.appendChild(articleMediaDOM);
  });
  main.appendChild(sectionMedia);

  //show price
  const sectionPrice = priceTemplate(info, media);
  const priceDOM = sectionPrice.getUserPriceDOM();
  main.appendChild(priceDOM);

  // show modal
  const sectionModal = modalTemplate(info);
  const modalDOM = sectionModal.getUserModalDOM();
  main.appendChild(modalDOM);
  const contactBtns = document.querySelectorAll(".contact-button");
  contactBtns.forEach((button) => {
    button.addEventListener("click", displayModal);
  });

  // call the modal validation
  document
    .getElementById("submitt-button")
    .addEventListener("click", function (event) {
      event.preventDefault();

      if (validate()) {
        // get firstname entry
        const firstName = document.getElementById("first");
        // get lastname entry
        const lastName = document.getElementById("last");
        // get email entry
        const email = document.getElementById("email");
        //get message entry
        const message = document.getElementById("message");
        console.log("vous avez bien rempli le formulaire");
        console.log("Votre nom est: " + lastName.value);
        console.log("Votre prénom est: " + firstName.value);
        console.log("Votre email est: " + email.value);
        console.log("Vous avez envoyé le message suivant: " + message.value);
        closeModal();
        resetForm();
      }
    });

  // show lightbox
  const sectionLightbox = lightboxTemplate();
  const lightboxDOM = sectionLightbox.getUserLightboxDOM();
  main.appendChild(lightboxDOM);
  const articleMedia = document.querySelectorAll(".article-media");
  // articleMedia.addEventListener("click", displayLightbox);
  
articleMedia.forEach((media) => {
    media.addEventListener("click", displayLightbox);
    media.addEventListener("keydown", function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            displayLightbox(event);
        }
    }); // for keyboad accesssibility
});
}

// Initialize the application
async function init() {
  // Fetches asynchronously the photographer data using `getPhotographers()`
  const { info, media } = await getPhotographer();

  // Once loaded, `displayData()` creates and displays the header and media
  if (info && media) {
    displayData(info, media);
  } else {
    console.error("No matching photographer found");
  }
}

init();
