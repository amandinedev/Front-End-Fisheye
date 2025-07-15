//get photographer list
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  // console.log("Les données des photographes:", data);
  return data;
}

//This function takes a list of photographers and dynamically creates HTML elements to display them.
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer-section");
  photographers.forEach((photographer) => {
    // Calls function `photographerTemplate(photographer)` to create a card
    const photographerModel = photographerTemplate(photographer);
    //Appends the created card (`userCardDOM`) to the selected container
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Fetches asynchronously the photographer data using `getPhotographers()`
  const { photographers } = await getPhotographers();
  //Once loaded, `displayData()` creates and displays the cards
  displayData(photographers);
}

init();
