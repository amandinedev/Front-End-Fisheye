// const clickedIndex = Array.from(document.querySelectorAll(".article-media")).indexOf(event.currentTarget);

// if (clickedIndex === -1 || !lightboxTemplateInstance) return;

// const main = document.querySelector("#main");
// let lightboxDOM = document.getElementById("lightbox");
// if (!lightboxDOM) {
//     lightboxDOM = lightboxTemplate().getUserLightboxDOM(media);
//     main.appendChild(lightboxDOM);
//     console.log(lightboxDOM)
//     lightboxDOM.style.display = "block";
// }

// // Clear existing carousel content
// lightboxDOM.querySelector(".carousel").innerHTML = '';

// Populate the carousel with media items
// lightboxDOM.displayLightboxMedia(media);

// currentItemPosition = clickedIndex;

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
    "nav, .header-photographer, .section-filter, .section-media, .article-media, .section-price"
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
  // const mediaItem =
  //   document.querySelector(".article-media:focus") ||
  //   document.querySelector(".article-media");
  // if (mediaItem) {
  //   mediaItem.focus();
  // }

  // Remove event listener for Escape key and Enter on close button
  window.removeEventListener("keydown", closeLightboxOnEscape);

  const photographerPageMainContent = document.querySelectorAll(
    "nav, .header-photographer, .section-filter, .section-media, .article-media, .section-price"
  );
  // Remove aria-hidden from main content elements
  if (photographerPageMainContent.length > 0) {
    photographerPageMainContent.forEach(element => {
      element.removeAttribute("aria-hidden");
      element.style.display = "flex";
    });
  }
}


// CLOSE LIGHTBOX ON ESCAPE
function closeLightboxOnEscape(event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    closeLightbox();
  }
}
    // } else if (event.key === "Enter") {
    //     const focusedElement = document.activeElement;
    //     // Only close lightbox when Enter is pressed and focus is on the close button
    //     if (
    //         focusedElement &&
    //         focusedElement.classList.contains("lightbox__close-button")
    //     ) {
    //         event.preventDefault();
    //         closeLightbox();
    //     }
    // }
// }

// function displayLightbox() {
//   const lightbox = document.getElementById("lightbox");
//   lightbox.style.display = "block";

//   // Set focus to the next button for keyboard users
//   const nextButton = lightbox.querySelector(".next");
//   if (nextButton) {
//     nextButton.focus();
//   }

//   const closeLightbox = lightbox.querySelector("lightbox__close-button");
//   if (closeLightbox) {
//     closeLightbox.focus();
//   }

//   //   Add event listener for Escape key
//   window.addEventListener("keydown", closeModalOnEscape);

//   //   Set role="dialog" and aria-hidden="true" to main content for accessibility
//   const photographerPageMainContent = document.querySelector(
//     ".header-photographer, .section-filter, .section-medias, .section-price"
//   );
//   if (photographerPageMainContent) {
//     photographerPageMainContent.setAttribute("aria-hidden", "true");
//   }
//   lightbox.setAttribute("role", "dialog");
// }

// //close lightbox
// function closeLightbox() {
//   const lightbox = document.getElementById("lightbox");
//   lightbox.style.display = "none";

//   // // Return focus to the image that triggered the lightbox.
//   const mediaItem =
//     document.querySelector(".article-media:focus") ||
//     document.querySelector(".article-media");
//   if (mediaItem) {
//     mediaItem.focus();
//   }

//   // Remove event listener for Escape key
//   window.removeEventListener("keydown", closeLightboxOnEscape);

//   // Set aria-hidden="false" back to main content when lightbox is closed.
//   const photographerPageMainContent = document.querySelector(
//     ".header-photographer, .section-filter, .section-medias, .section-price"
//   );
//   if (photographerPageMainContent) {
//     photographerPageMainContent.removeAttribute("aria-hidden");
//   }
// }

// // CLOSE LIGHTBOX ON ESCAPE
// function closeLightboxOnEscape(event) {
//   if (event.key === "Escape" || event.keyCode === 27) {
//     closeLightbox();
//   }
// }
