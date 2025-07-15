function photographerTemplate(data) {
  //extract photographer data properties
  const { name, id, city, country, tagline, price, portrait } = data;

  //construct a full URL access to the portrait image
  const picture = `assets/photographers/${portrait}`;

  function checkImageSize(img, name) {
    const width = img.width;
    const height = img.height;
    if (width === height) {
      img.className += "article__img--square";
    }
  }

  //dynamically creates en article element containing an image and a heading for the photographer.
  function getUserCardDOM() {
    const article = document.createElement("article");
    const titleId = `title-${id}`;
    const locationId = `location-${id}`;
    const taglineId = `tagline-${id}`;
    const priceId = `price-${id}`;
    // console.log(titleId, locationId, taglineId, priceId); 
    article.innerHTML = `
     <a href="photographer.html?id=${id}" aria-labelledby="${titleId} ${locationId} ${taglineId} ${priceId}">
      <div class="article__img--rounded">
      </div>
      <h2 id="${titleId}" class="article__title">${name}</h2>
    </a>
    <div class="article__info">
      <p id= "${locationId}" class="article__info--location">${city}, ${country}</p>
      <p id="${taglineId}" class="article__info--tagline">${tagline}</p>
      <p id="${priceId}" class="article__info--price">${price}€/jour</p>
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
