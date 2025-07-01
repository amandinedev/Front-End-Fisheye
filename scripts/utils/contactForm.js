/********* DISPLAY MODAL *************/
function displayModal() {
  const modal = document.getElementById("contact-modal");
  //  Set focus to the first form input element inside the modal.
  const firstInput = modal.querySelector("input");
  modal.style.display = "block";
  //keyboard user, focus on first input and close button
  if (firstInput) {
    setTimeout(() => {
      firstInput.focus();
    }, 100);
  }

  closeButton = document.querySelector("close-button");
  if (closeButton) {
    closeBtn.focus();
  }
  // Add event listener for Escape key and Enter on close button
  window.addEventListener("keydown", closeModalOnEscape);
  const closeModalBtn = modal.querySelector(".close-button");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
    closeModalBtn.focus();
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
}

  lightbox.setAttribute("role", "dialog");

/********* CLOSE MODAL *************/
function closeModal() {
  const modal = document.getElementById("contact-modal");
  modal.style.display = "none";

  //keyboard user, return focus to the contact button that triggered the modal.
  const contactButton = document.querySelector(".contact-button");
  if (contactButton) {
    contactButton.focus();
  }

  // Remove event listener for Escape key
  window.removeEventListener("keydown", closeModalOnEscape);

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

/********* CLOSE MODAL ON ESCAPE ************/
function closeModalOnEscape(event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    closeModal();
  } else if (event.key === "Enter") {
    const focusedElement = document.activeElement;
    // If the close button has focus and Enter is pressed, close the modal
    if (focusedElement && focusedElement.classList.contains("close-button")) {
      event.preventDefault();
      closeModal();
    }
  }
}

/********* VALIDATION MODAL *************/

// show error message on invalid input
function showErrorMessage(element, message) {
  // add attribute to switch to error style
  element.parentElement.setAttribute("data-error", message);
  element.parentElement.setAttribute("data-error-visible", "true");
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
  // get email entry
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
