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
}

// Template class for all types of media
class MediaTemplate {
  constructor(info, media) {
    this.info = info;
    this.media = media;
  }

  getUserMediaDOM() {
    throw new Error("Method 'getUserMediaDOM()' must be implemented.");
  }

  // construct the media path
  getMediaPath() {
    const { name } = this.info;
    return name.replace(/\s+/g, "").replace(/\-/g, "");
  }

  // create DOM elements for media content
  createMediaContent(title, likes) {
    const imgContent = document.createElement("div");
    imgContent.classList.add("article-media__content");
    imgContent.innerHTML = `
      <h2 class="article-media__content--title">${title}</h2>
      <div class="article-media__content--likes">
        <h3 class="article-media__content--likes-h3">${likes}</h3>
        <img class="article-media__content--likes-icon" src="./assets/images/like.svg" alt="Likes">
      </div>
      `;

    return imgContent;
  }

  //..............................................
  //   const imgContent = document.createElement("div");
  //   imgContent.className = "article-media__content";

  //   const h2 = document.createElement("h2");
  //   h2.className = "article-media__content--title";
  //   h2.textContent = title;

  //   const likeContent = document.createElement("div");
  //   likeContent.className = "article-media__content--likes";

  //   const h3 = document.createElement("h3");
  //   h3.textContent = likes;
  //   h3.className = "article-media__content--likes-h3";

  //   const likeIcon = document.createElement("img");
  //   likeIcon.className = "article-media__content--likes-icon";
  //   likeIcon.src = "./assets/images/like.svg";

  //   imgContent.appendChild(h2);
  //   imgContent.appendChild(likeContent);
  //   likeContent.appendChild(h3);
  //   likeContent.appendChild(likeIcon);

  //   return imgContent;
  // }
  //..............................................
}

// ImageMedia class extending MediaTemplate
class ImageMedia extends MediaTemplate {
  getUserMediaDOM() {
    const { image, title, likes } = this.media;

    // construct media folder path
    const mediaPath = this.getMediaPath();
    console.log("Media folder after removing spaces:", mediaPath);

    const picture = `assets/media/${mediaPath}/${image}`;
    console.log("Constructed image path:", picture);

    // create DOM elements for Image content
    const articleImg = document.createElement("a");
    articleImg.href = ``;
    articleImg.className = "article-media";
    articleImg.innerHTML = `
    <img src="${picture}" alt="${title}" class="article-media__img">`;
   
    //..............................................
    // const img = document.createElement("img");
    // img.setAttribute("src", picture);
    // img.setAttribute("alt", title);
    // img.className = "article-media__img";
    //..............................................

    // create media content
    const imgContent = this.createMediaContent(title, likes);

    articleImg.appendChild(imgContent);
    return articleImg;
  }
}

// VideoMedia class extending MediaTemplate
class VideoMedia extends MediaTemplate {
  getUserMediaDOM() {
    const { video, title, likes } = this.media;

    // Use the common method to construct media folder path
    const mediaPath = this.getMediaPath();
    console.log("Media folder after removing spaces:", mediaPath);

    const videoSrc = `assets/media/${mediaPath}/${video}`;
    console.log("Constructed video path:", videoSrc);

    const articleVideo = document.createElement("div");
    articleVideo.className = "article-media";

    const vid = `
    <video src="${videoSrc}" alt="${title}" controls="true" class="article-media__vid">`;
    articleVideo.innerHTML = vid;
    //..............................................
    // const vid = document.createElement("video");
    // vid.setAttribute("src", videoSrc);
    // vid.setAttribute("alt", title);
    // vid.controls = true;
    // vid.className = "article-media__vid";
    //..............................................

    // Use the common method to create media content
    const vidContent = this.createMediaContent(title, likes);
    articleVideo.appendChild(vidContent);

    return articleVideo;
  }
}
