const handleImageLoad = function (event, name) {
  const img = event.target;
  const width = img.width;
  const height = img.height;
  if (width === height) {
    img.classList.add(".article__img--square");
  }
};

function headerTemplate(info) {
  const { name, id, city, country, tagline, price, portrait } = info;
  const picture = `assets/photographers/${portrait}`;

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
      if (width === height) {
        img.className = "article__img--square";
      }
    };
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
