function photographerTemplate(data) {
  //extract photographer data properties
  const { name, id, city, country, tagline, price, portrait } = data;

  //construct a full URL access to the portrait image
  const picture = `assets/photographers/${portrait}`;
  
    function checkImageSize(img, name) {
      const width = img.width;
      const height = img.height;
      console.log("Image " + name + " width:", img.width);
      console.log("Image " + name + " height:", img.height);
      if (width === height) {
        img.className += "article__img--square";
      }
    }

  //dynamically creates en article element containing an image and a heading for the photographer.
  function getUserCardDOM() {
    const article = document.createElement("article");
    article.innerHTML =  `
     <a href="photographer.html?id=${id}" aria-label="aller vers la page de ${name}">
      <div class="article__img--rounded">
      </div>
      <h2 class="article__title">${name}</h2>
    </a>
    <div class="article__info" aria-label="information de la ou du photographe">
      <p class="article__info--location">${city}, ${country}</p>
      <p class="article__info--tagline">${tagline}</p>
      <p class="article__info--price">${price}€/jour</p>
    </div>`;
    //create image
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    img.className = "article__img";
    // If the image is square, add a class to it.
    img.onload = function () {
      const width = img.width;
      const height = img.height;
      console.log("Image " + name + " width:", img.width);
      console.log("Image " + name + " height:", img.height);
      if (width === height) {
        img.className = "article__img--square";
      }
    };
    const imgContainer = article.querySelector(".article__img--rounded");
    imgContainer.appendChild(img);
    return article;
  }
  return { name, id, city, country, tagline, price, picture, getUserCardDOM };
}
