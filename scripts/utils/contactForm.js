/********* DISPLAY MODAL *************/
// eslint-disable-next-line no-unused-vars
function displayModal() {
  const contactBtns = document.querySelectorAll(".contact-button");
  // Remove focus from all .contact-button elements
  contactBtns.forEach((button) => button.blur());

  const modal = document.getElementById("contact-modal");
  //  Set focus to the first form input element inside the modal.
  const firstInput = modal.querySelector("input");
  modal.style.display = "block";
  if (firstInput) {
    setTimeout(() => {
      firstInput.focus();
    }, 100);
  }

const closeModalBtn = modal.querySelector(".close-button");
if (closeModalBtn) {
  switch (true) {
    case window.addEventListener("keydown", closeModalOnEscape):
      break;
    case closeModalBtn.addEventListener("click", closeModal):
      closeModalBtn.focus();
      break;
  }
}

  // Set role="dialog" and aria-hidden="true" to main content for accessibility
  const photographerPageMainContent = document.querySelectorAll(
    "nav, .header-photographer, .section-filter, .section-media, .article-media, .section-price"
  );
  // Ensure that photographerPageMainContent is not null before proceeding
  if (photographerPageMainContent.length > 0) {
    photographerPageMainContent.forEach((element) => {
      element.setAttribute("aria-hidden", "true");
      element.style.display = "none";
    });
  }
  modal.setAttribute("role", "dialog");
}

/********* CLOSE MODAL *************/
function closeModal() {
  const modal = document.getElementById("contact-modal");
  modal.style.display = "none";

  //keyboard user, return focus to the contact button that triggered the modal.
  const contactButton = document.querySelector(".contact-button");
  if (contactButton) {
    setTimeout(() => {
      contactButton.focus();
    }, 100);
  }

  // Remove event listener for Escape key
  window.removeEventListener("keydown", closeModalOnEscape);

  const photographerPageMainContent = document.querySelectorAll(
    "nav, .header-photographer, .section-filter, .section-media, .article-media, .section-price"
  );
  // Remove aria-hidden from main content elements
  if (photographerPageMainContent.length > 0) {
    photographerPageMainContent.forEach((element) => {
      element.removeAttribute("aria-hidden");
      element.style.display = "flex";
    });
  }
}

/********* CLOSE MODAL ON ESCAPE ************/
function closeModalOnEscape(event) {
  const focusedElement = document.activeElement;
  switch (event.key) {
    case "Escape":
      if (event.keyCode === 27) { 
        closeModal();
      }
      break;
    case "Enter":
      if (focusedElement && focusedElement.classList.contains("close-button")) {
        event.preventDefault();
        closeModal();
      }
      break;
  }
}

/********* VALIDATION MODAL *************/

// show error message on invalid input
function showErrorMessage(element, message) {
  // add attribute to switch to error style
  element.parentElement.setAttribute("data-error", message);
  element.parentElement.setAttribute("data-error-visible", "true");
  // Ensure the error message is announced by assistive technologies
  element.parentElement.setAttribute("aria-live", "polite"); // Announce changes politely
  // Set focus on the input field with an error
  element.focus();
}
// clear error message on input change
function clearError(element) {
  if (element.parentElement.hasAttribute("data-error")) {
    element.parentElement.removeAttribute("data-error");
    element.parentElement.removeAttribute("data-error-visible");
  }
}
// validate firstname
function validateFirstName() {
  // get firstname entry
  const firstName = document.getElementById("first");
  // Clear any previous error messages
  clearError(firstName);
  // First name validation
  if (firstName.value.trim().length < 2) {
    showErrorMessage(
      firstName,
      "Le prénom doit contenir au moins deux caractères"
    );
    return false;
  }
  return true;
}
// validate lastname
function validateLastName() {
  // get lastname entry
  const lastName = document.getElementById("last");
  // Clear any previous error messages
  clearError(lastName);
  // First name validation
  if (lastName.value.trim().length < 2) {
    showErrorMessage(lastName, "Le nom doit contenir au moins deux caractères");
    return false;
  }
  return true;
}
// validate email
function validateEmail() {
  const email = document.getElementById("email");
  // get email entry
  const emailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/;
  // Clear any previous error messages
  clearError(email);
  // email validation
  if (!emailRegex.test(email.value)) {
    showErrorMessage(email, "Veuillez entrer une adresse email valide");
    return false;
  }
  return true;
}

//function to validate the form
// eslint-disable-next-line no-unused-vars
function validate() {
  let firsNameValid = validateFirstName();
  let lastNameValid = validateLastName();
  let emailValid = validateEmail();
  //validation rules
  if (firsNameValid && lastNameValid && emailValid) {
    return true;
  }
}

// Reset each input field
// eslint-disable-next-line no-unused-vars
function resetForm() {
  // Get all form inputs
  const inputs = document.querySelectorAll(".formData input");
  const textarea = document.querySelector(".formData textarea");
  // Clear the input value
  inputs.forEach((input) => {
    input.value = "";
  });
  // Clear the textarea value
  textarea.value = "";
}
