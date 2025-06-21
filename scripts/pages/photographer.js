//Mettre le code JavaScript lié à la page photographer.html
//get photographer data
async function getPhotographer() {
  const response = await fetch("../data/photographers.json");
  const photographersData = await response.json();
  console.log("Les données des photographes:", photographersData);
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  console.log(id);
  const photographerData = photographersData.photographers.filter(
    (photographer) => photographer.id === id
  );
  console.log(photographerData);
  return photographerData;
}

async function displayData(photographerData) {
  const photographerPage = photographerPageTemplate(photographerData);
  const headerArticleDOM = photographerPage.getUserHeaderArticleDOM();
  const headerImageDOM = photographerPage.getUserHeaderImageDOM();
  const photographerHeader = document.querySelector(".header-photographer");
  photographerHeader.insertBefore(headerArticleDOM, photographerHeader.firstChild);
  photographerHeader.appendChild(headerImageDOM);
}

async function init() {
  // Fetches asynchronously the photographer data using `getPhotographers()`
  const [photographer] = await getPhotographer();
  //Once loaded, `displayData()` creates and displays the header
  if (photographer) {
    displayData(photographer);
  } else {
    console.error("No matching photographer found");
  }
}

init();
