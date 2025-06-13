function photographerTemplate(data) {
    //extract photographer data properties
    const { name, portrait } = data;

    //construct a full URL access to the portrait image
    const picture = `assets/photographers/${portrait}`;

    //dynamically creates en article element containing an image and a heading for the photographer.
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}