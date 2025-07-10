// Define handleImageLoad globally to ensure it is available within inline event handlers.
const handleImageLoad = function (event, name) {
  const img = event.target;
  const width = img.width;
  const height = img.height;
  console.log("Image " + name + " width:", width);
  console.log("Image " + name + " height:", height);
  if (width === height) {
    img.classList.add(".article__img--square");
  }
};

function headerTemplate(info) {
  //extract photographer data properties
  const { name, id, city, country, tagline, price, portrait } = info;
  console.log(info);
  //construct a full URL access to the portrait image
  const picture = `assets/photographers/${portrait}`;
  console.log("Constructed image path:", picture); // Debugging log

  //dynamically creates en article element containing an image and a heading for the photographer.
  function getUserHeaderImageDOM() {
    const articleImg = document.createElement("div");
    articleImg.className = "article__img--rounded";

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `portrait de ${name}`);
    img.className = "article__img";

    // If the image is square, add a class to it.
    img.onload = function () {
      const width = img.width;
      const height = img.height;
      console.log("Image " + name + " width:", img.width); // Debugging log
      console.log("Image " + name + " height:", img.height); // Debugging log
      if (width === height) {
        img.className = "article__img--square";
      }
    };
    // Append all elements
    articleImg.appendChild(img);
    return articleImg;
  }

  function getUserHeaderArticleDOM() {
    const section = document.createElement("section");
    section.className = "header-photographer__section-info";
    section.innerHTML = `
      <h1 class="header-photographer__section-info--title">${name}</h1>
      <h2 class="header-photographer__section-info--location">${city}, ${country}</h2>
      <p class="header-photographer__section-info--tagline">${tagline}</p>
      `;
    return section;
  }
  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    picture,
    getUserHeaderArticleDOM,
    getUserHeaderImageDOM,
  };
}
