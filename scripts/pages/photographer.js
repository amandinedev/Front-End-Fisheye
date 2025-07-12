//Mettre le code JavaScript lié à la page photographer.html
// get photographer data (info and media)
async function getPhotographer() {
  // get photographers data
  const response = await fetch("data/photographers.json");
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

  //sort media based on selected criteria
  function sortMedia(media, sortBy) {
    switch (sortBy) {
      case "Popularité":
        return media.sort((a, b) => b.likes - a.likes);
      case "Date":
        return media.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "Titre":
      default:
        return media.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  function updateDOMWithSortedMedia(sortedMedia) {
    const sectionMedia = document.querySelector(".section-medias");
    // Clear existing articles
    while (sectionMedia.firstChild) {
      sectionMedia.removeChild(sectionMedia.firstChild);
    }

    sortedMedia.forEach((mediaItem, index) => {
      const mediaElement = MediaFactory.createMedia(info, mediaItem);
      const articleMediaDOM = mediaElement.getUserMediaDOM();
      // Assigning the correct data-slide attribute
      articleMediaDOM.setAttribute("data-slide", index + 1);
      sectionMedia.appendChild(articleMediaDOM);
    });
    setupLikeEventListeners();
    setupLightboxEventListeners();
  }

  function updateCarouselWithSortedMedia(sortedMedia) {
    const carousel = document.querySelector(".carousel");
    // Clear existing carousel items
    while (carousel.firstChild) {
      carousel.removeChild(carousel.firstChild);
    }
    sortedMedia.forEach((mediaItem, index) => {
      const lightboxElement = MediaFactory.createLightbox(info, mediaItem);
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
  }

  // Function to set up lightbox event listeners for media articles
  function setupLightboxEventListeners() {
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
  }
  //   Add event listeners for the filter functionality
  const filterButton = document.getElementById("filter");
  const filterOptions = document.getElementById("filter-options");
  const filterClosedImgElement = document.getElementById("filter-closed");
  const filterOpenedImgElement = document.getElementById("filter-opened");

  function handleFilterButtonClick() {
    const isExpanded = filterButton.getAttribute("aria-expanded") === "true";
    filterButton.setAttribute("aria-expanded", !isExpanded);
    // Toggle the display of the filter options
    filterOptions.style.display = isExpanded ? "none" : "block";

    if (!isExpanded) {
      // Move focus to the first item in the filter options when opened
      const firstOption = document.querySelector("#filter-options li");
      if (firstOption) {
        firstOption.focus();
      }
    } else {
      // Refocus on the filter button when closed
      filterButton.focus();
    }

    // Change the icon based on the expanded state
    if (!isExpanded) {
      filterClosedImgElement.style.display = "none";
      filterOpenedImgElement.style.display = "block"; // Show the opened icon
    } else {
      filterOpenedImgElement.style.display = "none";
      filterClosedImgElement.style.display = "block"; // Show the closed icon
    }
  }

  filterButton.addEventListener("click", handleFilterButtonClick);

  document.addEventListener("click", (event) => {
    if (
      !filterButton.contains(event.target) &&
      !filterOptions.contains(event.target)
    ) {
      filterButton.setAttribute("aria-expanded", false);
      filterOptions.style.display = "none";
      // Ensure the closed image is shown
      filterClosedImgElement.style.display = "block";
      filterOpenedImgElement.style.display = "none";
    }
  });

  filterOptions.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const selectedFilter = event.target.textContent;
      filterButton.textContent = event.target.textContent;
      filterOptions.style.display = "none";
      filterButton.setAttribute("aria-expanded", false);
      // Change the image back to closed state
      filterClosedImgElement.style.display = "block";
      filterOpenedImgElement.style.display = "none";
      // Sort media based on selected filter and update DOM
      const sortedMedia = sortMedia(media, selectedFilter);
      updateDOMWithSortedMedia(sortedMedia);
      updateCarouselWithSortedMedia(sortedMedia); // Recreate carousel items based on the new order
      // Reset total likes to initial value before sorting
      totalLikes = mediaTotalLikes;
      initialTotalLikesElement.textContent = totalLikes; //update DOM element
      //attach like event listeners after updating DOM
      // setupLikeEventListeners();
      // Refocus on the filter button
      filterButton.focus();
    }
  });

  // Add keyboard event listeners for accessibility
  filterButton.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "Enter":
      case " ":
        handleFilterButtonClick();
        break;
    }
  });

  filterOptions.addEventListener("keydown", (event) => {
    const options = Array.from(filterOptions.children);
    let currentIndex = options.indexOf(document.activeElement);

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (options[currentIndex]) {
          options[currentIndex].click();
        }
        break;
      case "Tab":
      case "ArrowDown":
        event.preventDefault();
        focusNextOption(currentIndex);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusPreviousOption(currentIndex);
        break;
      case "Escape":
        filterButton.focus();
        filterOptions.style.display = "none";
        filterClosedImgElement.style.display = "block";
        filterOpenedImgElement.style.display = "none";
        filterButton.setAttribute("aria-expanded", false);
        break;
    }
  });

  function focusNextOption(currentIndex) {
    const options = Array.from(filterOptions.children);
    let nextIndex = (currentIndex + 1) % options.length;
    while (options[nextIndex].tagName !== "LI") {
      nextIndex = (nextIndex + 1) % options.length;
    }
    options[nextIndex].focus();
  }

  function focusPreviousOption(currentIndex) {
    const options = Array.from(filterOptions.children);
    let prevIndex = (currentIndex - 1 + options.length) % options.length;
    while (options[prevIndex].tagName !== "LI") {
      prevIndex = (prevIndex - 1 + options.length) % options.length;
    }
    options[prevIndex].focus();
  }

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
  setupLightboxEventListeners();

  // SHOW PRICE
  const sectionPrice = priceTemplate(info, media);
  const priceDOM = sectionPrice.getUserPriceDOM();
  main.appendChild(priceDOM);

  // Set up likes counter and event listeners
  let totalLikes = 0; // Global variable to track total likes
  const mediaTotalLikes = media.reduce(
    (acc, mediaItem) => acc + mediaItem.likes,
    0
  ); // Initial total from media data

  function setupLikeEventListeners() {
    const likeIcons = document.querySelectorAll(
      ".article-media__content--likes-icon"
    );

    likeIcons.forEach(function (likeIcon) {
      let likesCountElement = likeIcon
        .closest(".article-media__content")
        .querySelector(".article-media__content--likes-h3");
      let likesCount = parseInt(likesCountElement.textContent, 10) || 0;

      function updateLikeStatus(isLiked) {
        likeIcon.dataset.liked = isLiked;
        likeIcon.setAttribute("aria-pressed", isLiked);
      }
      //add eventlistener for click
      likeIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the click from bubbling up to trigger lightbox
        handleLikeAction();
      });

      // Add event listeners for keydown
      likeIcon.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.stopPropagation(); // Prevent the keydown from bubbling up to trigger lightbox
          handleLikeAction();
        }
      });

      function handleLikeAction() {
        if (likeIcon.dataset.liked === "true") {
          // If already liked, unlike the article and decrement like counts
          likesCount -= 1;
          totalLikes -= 1; // Update global total likes count
          likeIcon.src = "./assets/icons/like-brown.svg"; // Reset like icon source
          updateLikeStatus(false);
        } else {
          // Like the article and increment like counts
          likesCount += 1;
          totalLikes += 1; // Update global total likes count
          initialTotalLikesElement.textContent = totalLikes; //update DOM element
          likeIcon.src = "./assets/icons/like-brown-filled.svg"; // Update like icon source
          updateLikeStatus(true);
        }
        likesCountElement.textContent = likesCount;
        initialTotalLikesElement.textContent = totalLikes; // update DOM element
      }
    });
  }

  // likes counter
  totalLikes = mediaTotalLikes;

  const initialTotalLikesElement = document.querySelector(
    ".section-price__content--likes-total"
  );

  if (initialTotalLikesElement) {
    totalLikes =
      parseInt(initialTotalLikesElement.textContent, 10) || mediaTotalLikes;
  }

  setupLikeEventListeners();

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
  setupLightboxEventListeners(articleMedia);

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
