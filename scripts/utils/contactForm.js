/********* DISPLAY MODAL *************/
function displayModal() {
  const modal = document.getElementById("contact-modal");
  //  Set focus to the first form input element inside the modal.
  const firstInput = modal.querySelector('input');
  modal.style.display = "block";
    if (firstInput) {
    firstInput.focus();
  }
}
/********* CLOSE MODAL *************/
function closeModal() {
  const modal = document.getElementById("contact-modal");
  modal.style.display = "none";
  // Return focus to the contact button that triggered the modal.
  const contactBtn = document.querySelector(".contact-button");
    if (contactBtn) {
    contactBtn.focus();
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
  if (
    firsNameValid &&
    lastNameValid &&
    emailValid
  ) {
    return true;
  }
}

// Reset each input field
function resetForm() {
  // Get all form inputs
  const inputs = document.querySelectorAll(".formData input");
  const textarea = document.querySelector(".formData textarea");
  // Clear the input value
  inputs.forEach(input => {
    input.value = "";
  });
  // Clear the textarea value
  textarea.value = "";
}
