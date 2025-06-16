function photographerTemplate(data) {
    //extract photographer data properties
    const { name, id, city, country, tagline, price, portrait} = data;

    //construct a full URL access to the portrait image
    const picture = `assets/photographers/${portrait}`;

    //dynamically creates en article element containing an image and a heading for the photographer.
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "${name}")
        img.className = "Article__portrait";
        const h2 = document.createElement( 'h2' );
        h2.className = "Article__title";
        h2.textContent = name;
        // Create info container with additional details about the photographer.
        articleInfo = document.createElement( 'div' );
        articleInfo.className = "Article__info";
        // Location and country
        const pLocation = document.createElement( 'p' );
        pLocation.className = "Article__info--location";
        pLocation.textContent = city+ ", " + country;
        // Tagline
        const pTagline = document.createElement('p');
        pTagline.className = "Article__info--tagline";
        pTagline.textContent = tagline;
        // Price
        const pPrice = document.createElement( 'p' );
        pPrice.className = "Article__info--price";
        pPrice.textContent = price + "€/jour";    
        // Append all elements
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(articleInfo);
        articleInfo.appendChild(pLocation);
        articleInfo.appendChild(pTagline);
        articleInfo.appendChild(pPrice);
        
        return (article);
    }
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}