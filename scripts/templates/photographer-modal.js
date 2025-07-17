// eslint-disable-next-line no-unused-vars
function modalTemplate(info) {
  const { name } = info;

  function getUserModalDOM() {
    const modalSection = document.createElement("div");
    modalSection.id = "contact-modal";
    modalSection.innerHTML = `
    <section class="modal" aria-labelledby="contact-heading">
    <h2 id= "contact-heading">Contactez-moi<br>${name}</br></h2>
    <img src="assets/icons/close.svg" class="close-button" alt="fermer le formulaire de contact" role=button tabindex="0"/>
    <form>
      <div class="formData">
        <label for="first">Prénom</label>
        <input 
          class="text-control"
          type="text"
          id="first"
          name="first"
          minlength="2"
          aria-describedby="input-rule"
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
          aria-describedby="input-rule"
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
      <span id="input-rule" class="sr-only">Minimum 2 caractères</span>
      <div class="formData">
        <label for="message">Votre message</label>
        <textarea
          class="text-control message"
          type="text"
          id="message"
          name="message"
          aria-label= votre-message
        ></textarea>
      </div>
        <button type="submit" id=submit-button class="brown-button submit" aria-label="Envoyer le formulaire de contact">Envoyer</button>
    </form>
    </section>
    `;
    return modalSection;
  }
  return { getUserModalDOM };
}
