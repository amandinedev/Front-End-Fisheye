function priceTemplate(info, media){
//extract photographer data properties
  const {price} = info;
  const {likes} = media;
  const totalLikes = media.reduce((acc, media) => acc + media.likes, 0);
  console.log (`Total likes: ${totalLikes}`);

// create DOM elements for filter section
  function getUserPriceDOM(){
    const priceSection = document.createElement("section");
    priceSection.className = "price-section";
    priceSection.innerHTML = `
    <div class="price-section__content--likes">
      <p class="price-section__content--likes-total">${totalLikes}</p>
      <img class="price-section__content--likes-icon" src="./assets/icons/like-black.svg" alt="">
    </div>
    <p class="price-section__content--price">${price}€/jour</p>
    `;
  return priceSection;
  }
  return {likes, price, getUserPriceDOM};
};
