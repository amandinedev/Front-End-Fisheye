function photographerTemplate(data) {
    //extract photographer data properties
    const { name, id, city, country, tagline, price, portrait} = data;

    //construct a full URL access to the portrait image
    const picture = `assets/photographers/${portrait}`;

    //dynamically creates en article element containing an image and a heading for the photographer.
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const lienPhotographer = document.createElement( 'a' );
        lienPhotographer.setAttribute("href", `photographer.html?id=${id}`);
        lienPhotographer.setAttribute("role", "link");
        lienPhotographer.setAttribute("aria-label", "aller vers la page de " + name);
        const articleImg = document.createElement( 'div' );
        articleImg.className="article__img--rounded";
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "")
        img.className="article__img";
         // If the image is square, add a class to it.
        img.onload = function() {
        const width = img.width;
        const height = img.height;
        console.log('Image ' + name + ' width:', img.width);
        console.log('Image ' + name + ' height:', img.height);
        if (width === height) {
            img.className = "article__img--square";
        }
       };
        const h2 = document.createElement( 'h2' );
        h2.className = "article__title";
        h2.textContent = name;
        // Create info container with additional details about the photographer.
        articleInfo = document.createElement( 'div' );
        articleInfo.className = "article__info";
        articleInfo.setAttribute("aria-label", "information de la ou du photographe");
        // Location and country
        const pLocation = document.createElement( 'p' );
        pLocation.className = "article__info--location";
        pLocation.textContent = city+ ", " + country;
        // Tagline
        const pTagline = document.createElement('p');
        pTagline.className = "article__info--tagline";
        pTagline.textContent = tagline;
        // Price
        const pPrice = document.createElement( 'p' );
        pPrice.className = "article__info--price";
        pPrice.textContent = price + "€/jour";    
        // Append all elements
        article.appendChild(lienPhotographer)
        lienPhotographer.appendChild(articleImg);
        articleImg.appendChild(img);
        lienPhotographer.appendChild(h2);
        article.appendChild(articleInfo);
        articleInfo.appendChild(pLocation);
        articleInfo.appendChild(pTagline);
        articleInfo.appendChild(pPrice);
        
        return (article);
    }
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}