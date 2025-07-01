function lightboxTemplate() {

  function getUserLightboxDOM() {
    const lightboxSection = document.createElement("div");
    lightboxSection.id = "lightbox";
    lightboxSection.innerHTML = `
    <div class="lightbox-content">
    <img src="assets/icons/close-brown.svg" class="lightbox__close-button" alt="fermer le carrousel" tabindex="0"/>
    <img src="assets/icons/previous-arrow.svg" class="previous" alt="retour à l'image précédente" tabindex="1"/>
    <ul class="carousel">
    </ul>
    <img src="assets/icons/next-arrow.svg" class="next" alt="aller à l'image suivante" tabindex="2"/>
    </div>
    `;
    return lightboxSection;
  }
  return {getUserLightboxDOM};
}


// // Global variables for carousel
// let currentItemPosition = 0;
// const $prevBtn = $('.prev-image');
// const $nextBtn = $('.next-image');
// const $carouselItems = $('.carousel-item');

// // Add event listeners for previous and next buttons
// $prevBtn.click(function() {
//     goToPreviousSlide();
// });
// $nextBtn.click(function() {
//     goToNextSlide();
// });

// $(document).keydown(function(e) {
//     const keyCode = e.keyCode ? e.keyCode : e.which;
//     if (keyCode === 39) { // Right arrow
//         goToNextSlide();
//     } else if (keyCode === 37) { // Left arrow
//         goToPreviousSlide();
//     }
// });



  // function displayLightboxMedia(media) {
  //   const carousel = getUserLightboxDOM().querySelector(".carousel");
  //   media.forEach((mediaItem) => {
  //     const carouselItem = document.createElement("li");
  // //     carouselItem.classList.add("carousel-item", `item-${index}`);
  // //     carouselItem.setAttribute('aria-hidden', (index === 0 ? 'false' : 'true'));
  //     if (mediaItem.image) {
  //       const img = document.createElement("img");
  //       img.src = `../assets/images/${mediaItem.image}`;
  //       img.className = "carousel-item__img";
  //       img.alt = "";
  //       img.setAttribute("aria-labelledby", "image-description");
  //       img.innerHTML = `
  //       <h2 class= "image-title" id="image-description>${mediaItem.title}</h2>`
  //       carouselItem.appendChild(img);
  //     } else if (mediaItem.video) {
  //       const video = document.createElement("video");
  //       video.setAttribute("src", `../assets/videos/${mediaItem.video}`);
  //       video.setAttribute("controls", true);
  //       video.setAttribute("type","video");
  //       video.setAttribute("aria-labelledby", "video-description");
  //       video.innerHTML = `
  //         <h2 class= "video-title" id="video-description">${mediaItem.title}</h2>
  //         `;
  //       carouselItem.appendChild(video);
  //     }
  //     if (index === 0) {
  //               carouselItem.style.display = 'block';
  //           } else {
  //               carouselItem.style.display = 'none';
  //           }
  //           carousel.appendChild(carouselItem);

  // });
  //     return carousel;
  // }