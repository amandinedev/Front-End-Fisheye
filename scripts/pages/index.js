    //get photographer list
    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }

//This function takes a list of photographers and dynamically creates HTML elements to display them.
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer-section");

        photographers.forEach((photographer) => {
            // Calls function `photographerTemplate(photographer)` to create a card
            const photographerModel = photographerTemplate(photographer);
            //Appends the created card (`userCardDOM`) to the selected container
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Fetches asynchronously the photographer data using `getPhotographers()`
        const { photographers } = await getPhotographers();
        //Once loaded, `displayData()` creates and displays the cards
        displayData(photographers);
    }
    
    init();
    
