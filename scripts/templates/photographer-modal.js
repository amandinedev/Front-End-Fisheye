function modalTemplate(info) {
  const {name} = info;

  // create DOM elements for filter section
  function getUserModalDOM() {
    const modalSection = document.createElement("div");
    modalSection.id= "contact-modal";
    modalSection.innerHTML = `
    <section class="modal">
     <h2>Contactez-moi</h2>
     <h3>${name}</h3>
     <img src="assets/icons/close.svg" class="close-button" alt="fermer le formulaire de contact" />
    <form >
      <div class="formData">
        <label for="first">Prénom</label>
        <input 
          class="text-control"
          type="text"
          id="first"
          name="first"
          minlength="2"
        />
      </div>
      <div class="formData">
        <label for="last">Nom</label>
        <input 
          class="text-control"
          type="text"
          id="last"
          name="last"
          minlength="2"
        />
      </div>
      <div class="formData">
        <label for="email">E-mail</label>
        <input
          class="text-control"
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div class="formData">
        <label for="message">Votre message</label>
        <textarea
          class="text-control message"
          type="text"
          id="message"
          name="message"
        ></textarea>
      </div>
        <button class="brown-button" id="submitt-button">Envoyer</button>
    </form>
    </section>
    `;
    return modalSection;
  }
  return { getUserModalDOM };
}
