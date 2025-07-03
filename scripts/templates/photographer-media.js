// Factory method to create media elements based on their type
class MediaFactory {
  static createMedia(info, media) {
    if (media.image) {
      return new ImageMedia(info, media);
    } else if (media.video) {
      return new VideoMedia(info, media);
    } else {
      throw new Error(`Unsupported media type: ${media.type}`);
    }
  }
  //to create lightbox elements based on their type
  static createLightbox(info, media) {
      if (media.image) {
        return new ImageLightbox(info, media);
      } else if (media.video) {
        return new VideoLightbox(info, media);
      } else {
        throw new Error(`Unsupported media type: ${media.type}`);
      }
  }
}

// Template class for all types of media
class MediaTemplate {
  constructor(info, media) {
    this._name = info.name;
    this.mediaPath = this.getMediaPath();
    this._title = media.title;
    this._likes = media.likes;
    this._image = media.image;
    this._video = media.video;
  }

  getUserMediaDOM() {
    throw new Error("Method 'getUserMediaDOM()' must be implemented.");
  }

  // construct the media path
  getMediaPath() {
    return `assets/media/${this._name.replace(/\s+/g, "").replace(/\-/g, "")}`;
  }

  // create DOM elements for media content
  createMediaContent() {
    const imgContent = document.createElement("div");
    imgContent.classList.add("article-media__content");
    imgContent.innerHTML = `
      <h2 class="article-media__content--title">${this._title}</h2>
      <div class="article-media__content--likes">
        <h3 class="article-media__content--likes-h3">${this._likes}</h3>
        <img class="article-media__content--likes-icon" src="./assets/icons/like-brown.svg" alt="">
      </div>
      `;
    return imgContent;
  }
  createLightboxContent() {
  throw new Error("Method 'createLightboxContent()' must be implemented.");
  }
}

// ImageMedia class extending MediaTemplate
class ImageMedia extends MediaTemplate {
  getUserMediaDOM() {
    // construct image path
    const picture = `${this.mediaPath}/${this._image}`;

    // create DOM elements for Image content
    const articleImg = document.createElement("article");
    articleImg.tabIndex = 0; // Make div focusable
    articleImg.className = "article-media";
    articleImg.innerHTML = `
    <img src="${picture}" alt="" class="article-media__img">`;

    // create media content
    const imgContent = this.createMediaContent();
    articleImg.appendChild(imgContent);
    return articleImg;
  }
}

// VideoMedia class extending MediaTemplate
class VideoMedia extends MediaTemplate {
  getUserMediaDOM() {
    // construct video path
    const videoSrc = `${this.mediaPath}/${this._video}`;

    const articleVideo = document.createElement("article");
    articleVideo.tabIndex = 0; // Make div focusable
    articleVideo.className = "article-media";
    articleVideo.innerHTML = `
    <video src="${videoSrc}" class="article-media__vid" aria-labelledby="video-description">
    <div id="video-description" class="sr-only">${this.title}</div>`;

    // Prevent inner video elements from being focusable
    const videos = articleVideo.querySelectorAll("video");
    videos.forEach((video) => {
      video.tabIndex = -1;
    });

    // create media content
    const vidContent = this.createMediaContent();
    articleVideo.appendChild(vidContent);

    return articleVideo;
  }
}

// extend mediaFactory
// define ImageLightbox and VideoLightbox classes for creating lightbox items.
class ImageLightbox extends MediaTemplate {
  createLightboxContent() {
    // construct image path
    const picture = `${this.mediaPath}/${this._image}`;
   
    // create DOM elements for Image content
    const lightboxItem = document.createElement("div");
    lightboxItem.className = "carousel-item__content";
    lightboxItem.innerHTML = `
    <img src="${picture}" class="carousel-item__img" alt="" aria-labelledby="carousel-item__img--description"/>
    <h2 id="carousel-item__img--description">${this._title}</h2>`;
    // create media content
    return lightboxItem;
  }
}

class VideoLightbox extends MediaTemplate {
  createLightboxContent() {
      // construct video path
    const videoSrc = `${this.mediaPath}/${this._video}`;

    // create DOM elements for video content
    const lightboxItem = document.createElement("div");
    lightboxItem.className = "carousel-item__content";
    lightboxItem.innerHTML = `
    <video src="${videoSrc}" class="carousel-item__vid" type="video/mp4" controls="true" tabindex="0" arialabelledby="carousel-item__vid--description"></video>
    <h2 id="carousel-item__vid--description">${this._title}</h2>`;

// create lightbox content
    return lightboxItem;
  }
}