// eslint-disable-next-line no-unused-vars
function lightboxTemplate() {
  function getUserLightboxDOM() {
    const lightboxSection = document.createElement("div");
    lightboxSection.id = "lightbox";
    lightboxSection.setAttribute("role", "dialog");
    lightboxSection.setAttribute("aria-label", "image closeup view");
    lightboxSection.setAttribute("aria-labelledby", "lightboxTitle");
    lightboxSection.innerHTML = `
    <div class="lightbox-content">
    <img src="assets/icons/close-brown.svg" class="lightbox__close-button" aria-label="Close lightbox" alt="fermer le carrousel" tabindex="0"/>
    <img src="assets/icons/previous-arrow.svg" class="previous" aria-label="Previous image" alt="retour à l'image précédente" tabindex="0"/>
    <ul class="carousel">
    </ul>
    <img src="assets/icons/next-arrow.svg" class="next" aria-label="Next image" alt="aller à l'image suivante" tabindex="0"/>
    </div>
    <span id="lightboxTitle" class="sr-only">Carousel de contenus visuels</span>
    <span id="lightboxAnnouncement" class="sr-only" role="alert"></span>
    `;
    return lightboxSection;
  }
  return { getUserLightboxDOM };
}
