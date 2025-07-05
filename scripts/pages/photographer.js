//Mettre le code JavaScript lié à la page photographer.html
// get photographer data (info and media)
async function getPhotographer() {
  // get photographers data
  const response = await fetch("../data/photographers.json");
  const photographersData = await response.json();
  console.log("Les données des photographes:", photographersData);
  // get photographer id from urlParams
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  console.log("photographe id:", id);
  // get photographer data
  const photographer = photographersData.photographers.filter(
    (photographer) => photographer.id === id
  );
  const info = photographer[0];
  const media = photographersData.media
    .filter((media) => media.photographerId === id)
    .reverse();
  return { info, media };
}

// Function to display data using the factory pattern
async function displayData(info, media) {
  const photographerHeader = document.querySelector(".header-photographer");

  // SHOW HEADER
  const photographerPage = headerTemplate(info);
  const headerArticleDOM = photographerPage.getUserHeaderArticleDOM();
  const headerImageDOM = photographerPage.getUserHeaderImageDOM();
  photographerHeader.insertBefore(
    headerArticleDOM,
    photographerHeader.firstChild
  );
  photographerHeader.appendChild(headerImageDOM);

  //SHOW FILTER
  const sectionFilter = filterTemplate(media);
  const filterDOM = sectionFilter.getUserFilterDOM();
  const main = document.getElementById("main");
  main.appendChild(filterDOM);

  // SHOW MEDIA
  const sectionMedia = document.createElement("section");
  sectionMedia.classList.add("section-medias");
  console.log("Initial media array:", media);
  media.forEach((mediaItem, index) => {
    const mediaElement = MediaFactory.createMedia(info, mediaItem);
    console.log("this is", mediaItem);
    const articleMediaDOM = mediaElement.getUserMediaDOM();
    // Assigning the correct data-slide attribute
    articleMediaDOM.setAttribute("data-slide", index + 1);
    sectionMedia.appendChild(articleMediaDOM);
  });
  main.appendChild(sectionMedia);

  // SHOW PRICE
  const sectionPrice = priceTemplate(info, media);
  const priceDOM = sectionPrice.getUserPriceDOM();
  main.appendChild(priceDOM);
  // likes counter
  let totalLikes = 0; // Global variable to track total likes
  const mediaTotalLikes = media.reduce(
    (acc, mediaItem) => acc + mediaItem.likes,
    0
  ); // Initial total from media data

  const likeIcons = document.querySelectorAll(
    ".article-media__content--likes-icon"
  );
  const initialTotalLikesElement = document.querySelector(
    ".section-price__content--likes-total"
  );

  if (initialTotalLikesElement) {
    totalLikes =
      parseInt(initialTotalLikesElement.textContent, 10) || mediaTotalLikes;
  }

  likeIcons.forEach(function (likeIcon) {
    let likesCountElement = likeIcon
      .closest(".article-media__content")
      .querySelector(".article-media__content--likes-h3");
    let likesCount = parseInt(likesCountElement.textContent, 10) || 0;

    likeIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent the click from bubbling up to trigger lightbox

      if (likeIcon.dataset.liked === "true") return; // Prevent further clicks

      likesCount += 1;
      likesCountElement.textContent = likesCount;

      totalLikes += 1; // Update global total likes count
      initialTotalLikesElement.textContent = totalLikes; //update DOM element

      likeIcon.dataset.liked = "true"; // Mark as liked to prevent further clicks
    });
  });

  // SHOW MODAL
  const sectionModal = modalTemplate(info);
  const modalDOM = sectionModal.getUserModalDOM();
  main.appendChild(modalDOM);
  const contactBtns = document.querySelectorAll(".contact-button");
  contactBtns.forEach((button) => {
    button.addEventListener("click", displayModal);
  });

  // call the modal validation
  document
    .getElementById("submit-button")
    .addEventListener("click", function (event) {
      event.preventDefault();

      if (validate()) {
        // get firstname entry
        const firstName = document.getElementById("first");
        // get lastname entry
        const lastName = document.getElementById("last");
        // get email entry
        const email = document.getElementById("email");
        //get message entry
        const message = document.getElementById("message");
        console.log("vous avez bien rempli le formulaire");
        console.log("Votre nom est: " + lastName.value);
        console.log("Votre prénom est: " + firstName.value);
        console.log("Votre email est: " + email.value);
        console.log("Vous avez envoyé le message suivant: " + message.value);
        closeModal();
        resetForm();
      }
    });

  // SHOW LIGHTBOX
  // create carousel container
  const sectionLightbox = lightboxTemplate();
  const lightboxDOM = sectionLightbox.getUserLightboxDOM();
  main.appendChild(lightboxDOM);
  // create carousel items
  const carousel = document.querySelector(".carousel");
  media.forEach((mediaItem, index) => {
    const lightboxElement = MediaFactory.createLightbox(info, mediaItem);
    console.log(lightboxElement);
    const carouselItem = document.createElement("li");
    carouselItem.classList.add("carousel-item", `item-${index}`);
    if (
      lightboxElement instanceof ImageLightbox ||
      lightboxElement instanceof VideoLightbox
    ) {
      const content = lightboxElement.createLightboxContent();
      carouselItem.appendChild(content);
    }
    carousel.appendChild(carouselItem);
  });

  // Initialize the lightbox with all media items
  const articleMedia = document.querySelectorAll(".article-media");
  articleMedia.forEach((media) => {
    // Click event listener to display lightbox
    media.addEventListener("click", function (event) {
      displayLightbox(event);
      currentSlide(parseInt(this.getAttribute("data-slide")));
      triggeredMediaItem = this; // Store the reference to the clicked media item
      // to set focus back on it when the user close lightbox
    });
    // Keyboard event listener to display lightbox
    media.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        displayLightbox(event);
        currentSlide(parseInt(this.getAttribute("data-slide")));
        triggeredMediaItem = this; // Store the reference to the clicked media item
        // to set focus back on it when the user close lightbox
      }
    });
  });

  //navigate lightbox with next, previous button
  const previousItem = document.querySelector(".previous");
  const nextItem = document.querySelector(".next");

  if (previousItem) {
    // Click event listener for previous item
    previousItem.addEventListener("click", function (event) {
      plusSlides(-1);
      event.preventDefault();
    });
    // Keyboard event listener for Enter key on previous item
    previousItem.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        plusSlides(-1);
        event.preventDefault();
      }
    });
  }

  if (nextItem) {
    // Click event listener for next item
    nextItem.addEventListener("click", function (event) {
      plusSlides(1);
      event.preventDefault();
    });
    // Keyboard event listener for Enter key on next item
    nextItem.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        plusSlides(1);
        event.preventDefault();
      }
    });
  }

  // Global keyboard control for arrow keys
  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      if (document.activeElement === nextItem) {
        previousItem.focus();
      } else if (previousItem && document.activeElement !== previousItem) {
        previousItem.focus();
      }
      plusSlides(-1);
      event.preventDefault();
    } else if (event.key === "ArrowRight") {
      if (document.activeElement === previousItem) {
        nextItem.focus();
      } else if (nextItem && document.activeElement !== nextItem) {
        nextItem.focus();
      }
      plusSlides(1);
      event.preventDefault();
    }
  }

  lightbox.addEventListener("keydown", handleKeyDown);
}

// Initialize the application
async function init() {
  // Fetches asynchronously the photographer data using `getPhotographers()`
  const { info, media } = await getPhotographer();

  // Once loaded, `displayData()` creates and displays the header and media
  if (info && media) {
    displayData(info, media);
  } else {
    console.error("No matching photographer found");
  }
}

init();
