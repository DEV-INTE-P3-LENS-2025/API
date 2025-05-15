const url = "https://randomuser.me/api/?results=50";
const main = document.querySelector(".main");
let users = [];

//on a crée le const pour qu'on puisse chercher le input et on l'a appelé searchinput
const searchinput = document.getElementById("searchbar");
const searchbtn = document.querySelector(".btn");

//on a crée la function et ca se lit comme ca:
searchbtn.addEventListener("click", function () { //a notre input q'on l'appele ici searchinput on lui ajoute un event listener que (quand on ecrie dans l'input la function s'execute qui est ...)
    const valeur = searchinput.value.toLowerCase(); //on a crée une const valeur qui est CE QUE JE TAPE DANS L'INPUT ET CE que j'ai tapé est la valeur


    const filteredusers = users.filter(user => {//on a crée une const filteredusers qui est les users filtrés = “Parmi tous les users, je prends chaque utilisateur un par un (appelé user), et je garde seulement ceux pour lesquels le test dans la fonction est vrai.”
        const fullname = (user.name.first + " " + user.name.last).toLowerCase();//on a crée une const fullname qui est le nom et prenom de l'utilisateur 
        return fullname.includes(valeur);//return(la sortie de la function c'est) si dans le fullname il y a la valeur que je tape dans l'input
    });

//vider le conteneur principal
    main.textContent = "";

//afficher les users filtrés:
    filteredusers.forEach(user => {//pour chaque user de filteredusers  
        const card = createusercard(user);//on crée une const card qui est la carte de l'utilisateur
        main.appendChild(card);//on ajoute la carte de l'utilisateur dans le conteneur principal
    })
});

// Fonction pour FILTRER par genre
function filter(gender) {
    // Vider le conteneur principal
    main.textContent = "";
    
    // Filtrer et afficher les utilisateurs selon le genre
    users.forEach(user => {
        if (gender === 'all' || user.gender === gender) {
            const card = createusercard(user);
            main.appendChild(card);
        }
    });
}

// Ajouter les écouteurs d'événements pour les boutons de filtrage par genre
document.querySelectorAll(".menu-item")[0].addEventListener("click", () => filter('all'));
document.querySelectorAll(".menu-item")[1].addEventListener("click", () => filter('male'));
document.querySelectorAll(".menu-item")[2].addEventListener("click", () => filter('female'));

// Fonction pour TRIER par montant
function sortamount() {
    users.sort((a, b) => {
        return b.amount - a.amount;  
    });
    
    main.textContent = "";
    
    users.forEach(user => {
        const card = createusercard(user);
        main.appendChild(card);
    });
}

document.querySelectorAll(".menu-item")[3].addEventListener("click", sortamount);


// Fonction pour TRIER par nom
function sort() {
    users.sort((a, b) => {
        const nameA = (a.name.first + " " + a.name.last).toLowerCase();
        const nameB = (b.name.first + " " + b.name.last).toLowerCase();
            return nameA.localeCompare(nameB);
    });
        
      // Vider le conteneur principal
     main.textContent = "";
    
      // Réafficher les cartes triées
    users.forEach(user => {
        const card = createusercard(user);
        main.appendChild(card);
    });
}
// Ajouter l'écouteur d'événements pour le bouton de tri
document.querySelectorAll(".menu-item")[4].addEventListener("click", sort);

// Fonction pour récupérer les données de l'API
async function getdata(url, donnees = {}) {
    const reponse = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    return reponse.json();
}

// Fonction pour AFFICHER
getdata(url).then(donnees => {
    users = donnees.results;
    users.forEach(user => {
        let amount = (Math.floor(Math.random() * 70) * 10 + 10).toFixed(2);
        user.amount = amount;
        const card = createusercard(user);
        main.appendChild(card);
    });
});

// Fonction pour CREER les cartes
function createusercard(user) {
    const card = document.createElement("section");
    card.classList.add("card");
    const amnt = document.createElement("p");
    amnt.classList.add("amnt");
    amnt.textContent = user.amount + " €";
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = user.picture.large;
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = user.name.first + " " + user.name.last;
    const place = document.createElement("section");
    place.classList.add("place");
    const icn = document.createElement("img");
    icn.classList.add("icn");
    icn.src = "./images/img6.svg";
    const city = document.createElement("p");
    city.classList.add("city");
    city.textContent = user.location.city + ", ";
    const country = document.createElement("p");
    country.classList.add("country");
    country.textContent = user.location.country;
    const telephone = document.createElement("section");
    telephone.classList.add("telephone");
    const tlp = document.createElement("img");
    tlp.classList.add("tlp");
    tlp.src = "./images/img7.svg";
    const number = document.createElement("p");
    number.classList.add("number");
    number.textContent = user.phone;
    card.appendChild(amnt);
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(place);
    place.appendChild(icn);
    place.appendChild(city);
    place.appendChild(country);
    card.appendChild(telephone);
    telephone.appendChild(tlp);
    telephone.appendChild(number);
    return card;
}


