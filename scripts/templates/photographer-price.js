function priceTemplate(info, media){
//extract photographer data properties
  const {price} = info;
  const {likes} = media;
  const totalLikes = media.reduce((acc, media) => acc + media.likes, 0);
  console.log (`Total likes: ${totalLikes}`);

// create DOM elements for filter section
  function getUserPriceDOM(){
    const priceSection = document.createElement("section");
    priceSection.className = "section-price";
    priceSection.innerHTML = `
    <div class="section-price__content--likes">
      <h2 class="section-price__content--likes-total">${totalLikes}</h2>
      <img class="section-price__content--likes-icon" src="./assets/icons/like-black.svg" alt="likes">
    </div>
    <h3 class="section-price__content--price">${price}€/jour</h3>
    `;
  return priceSection;
  }
  return {likes, price, getUserPriceDOM};
};
