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
  return { getUserLightboxDOM };
}
