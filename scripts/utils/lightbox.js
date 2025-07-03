/********* DISPLAY LIGHTBOX *************/

function displayLightbox(event) {
  // Handle click logic for lightbox display
  // Check if it's a click event or an appropriate keydown (Enter/Space)
  if (
    event.type === "click" ||
    (event.type === "keydown" && (event.key === "Enter" || event.key === " "))
  ) {
    // Prevent default action for spacebar
    if (event.type === "keydown" && event.key === " ") {
      event.preventDefault();
    }
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "block";


  }

  // Set focus to the next button for keyboard users
  const nextButton = lightbox.querySelector(".next");
  if (nextButton) {
    // Ensure focus is set on the next button after a slight delay
    setTimeout(() => {
      nextButton.focus();
    }, 100);
  }

  // Add event listener for Escape key and Enter on close button
  window.addEventListener("keydown", closeLightboxOnEscape);
  const closeLightboxBtn = lightbox.querySelector(".lightbox__close-button");
  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener("click", closeLightbox);
    closeLightboxBtn.focus();
    closeLightboxBtn.addEventListener("keydown", function(event){
if ( event.key === "Enter" || event.key === " "){
  closeLightbox();
}
});
  }

  // Set role="dialog" and aria-hidden="true" to main content for accessibility
  const photographerPageMainContent = document.querySelectorAll(
    "nav, .header-photographer, .section-filter, .section-medias, .article-media, .section-price"
  );
// Ensure that photographerPageMainContent is not null before proceeding
if (photographerPageMainContent.length > 0) {
  photographerPageMainContent.forEach(element => {
    element.setAttribute("aria-hidden", "true");
    element.style.display = 'none';
  });
}

  lightbox.setAttribute("role", "dialog");

}

/********* CLOSE LIGHTBOX *************/
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";

  // Return focus to the image that triggered the lightbox
if (triggeredMediaItem) {
  console.log('triggeredMediaItem', triggeredMediaItem);
  setTimeout(() => {
      triggeredMediaItem.focus();
    }, 100);

  // Remove event listener for Escape key and Enter on close button
  window.removeEventListener("keydown", closeLightboxOnEscape);

  const photographerPageMainContent = document.querySelectorAll(
    "nav, .header-photographer, .section-filter, .section-medias, .article-media, .section-price"
  );
  // Remove aria-hidden from main content elements
  if (photographerPageMainContent.length > 0) {
    photographerPageMainContent.forEach(element => {
      element.removeAttribute("aria-hidden");
      element.style.display = "flex";
    });
  }
}
}
// CLOSE LIGHTBOX ON ESCAPE
function closeLightboxOnEscape(event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    closeLightbox();
  }
}

//NAVIGATE LIGHTBOX
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.querySelectorAll(".carousel-item");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
    // Hide all slides first
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // display the slide
    slides[slideIndex - 1].style.display = "block";
  
}
