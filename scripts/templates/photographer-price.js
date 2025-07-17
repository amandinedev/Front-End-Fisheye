// eslint-disable-next-line no-unused-vars
function priceTemplate(info, media) {
  const { price } = info;
  const { likes } = media;

  const mediaTotalLikes = media.reduce((acc, media) => acc + media.likes, 0);
  // console.log(`Initial total likes from media: ${mediaTotalLikes}`);

  function getUserPriceDOM() {
    const priceSection = document.createElement("section");
    priceSection.className = "section-price";
    priceSection.setAttribute("tabindex", "0");
    priceSection.innerHTML = `
    <div class="section-price__content--likes">
      <h2 class="section-price__content--likes-total">${mediaTotalLikes}</h2>
      <img class="section-price__content--likes-icon" src="./assets/icons/like-black.svg" alt="likes au total">
    </div>
    <h3 class="section-price__content--price">${price}€/jour</h3>
    `;

    return priceSection;
  }
  return { likes, price, mediaTotalLikes, getUserPriceDOM };
}
