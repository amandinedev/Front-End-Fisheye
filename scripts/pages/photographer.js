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
  const photographer = photographersData.photographers.filter((photographer) => photographer.id === id);
  const info = photographer[0];
  const media = photographersData.media.filter((media) => media.photographerId === id).reverse();
  // const photographerData = {photographer:photographerInfo, media: photographerMedia}
  // console.log("Les données du photographe", photographerData)
  return {info, media};
}

// Function to display data using the factory pattern
async function displayData(info, media) {
  const photographerHeader = document.querySelector(".header-photographer");

  // Show header
  const photographerPage = headerTemplate(info);
  const headerArticleDOM = photographerPage.getUserHeaderArticleDOM();
  const headerImageDOM = photographerPage.getUserHeaderImageDOM();
  photographerHeader.insertBefore(headerArticleDOM, photographerHeader.firstChild);
  photographerHeader.appendChild(headerImageDOM);

  // Show media
  const main = document.getElementById("main");
  const sectionMedia = document.createElement("section");
  sectionMedia.classList.add("section-medias");
  console.log("Initial media array:", media);
  media.forEach((mediaItem) => {
    const mediaElement = MediaFactory.createMedia(info, mediaItem);
    console.log("this is",mediaItem);
    const articleMediaDOM = mediaElement.getUserMediaDOM();
    sectionMedia.appendChild(articleMediaDOM);
  });
  main.appendChild(sectionMedia);
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