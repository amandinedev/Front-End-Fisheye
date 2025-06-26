// Wait until the entire page is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  const contactBtn = document.querySelectorAll(".contact-button");

  // Ensure there are buttons to add listeners to
  if (contactBtn.length) {
    contactBtn.forEach((btn) => btn.addEventListener("click", displayModal));
  }
});

function displayModal() {
    const modal = document.getElementById("contact-modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
