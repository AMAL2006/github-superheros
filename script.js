// Fonction pour charger les héros
async function loadHeroes() {
    const container = document.getElementById("heroesList");
    
    // On regarde si on a déjà des données
    let herosSauvegardes = localStorage.getItem("heroes");

    if (herosSauvegardes) {
        // Si oui on les affiche
        displayHeroes(JSON.parse(herosSauvegardes));
    } else {
        // Sinon on lit le fichier JSON
        try {
            const reponse = await fetch("heroes.json");
            const data = await reponse.json();
            // On sauvegarde dans le storage
            localStorage.setItem("heroes", JSON.stringify(data));
            displayHeroes(data);
        } catch (e) {
            container.innerHTML = "Erreur de chargement";
        }
    }
}

// Fonction pour afficher les cartes
function displayHeroes(liste) {
    const container = document.getElementById("heroesList");
    container.innerHTML = "";

    liste.forEach(h => {
        const carte = document.createElement("div");
        carte.className = "hero-card";

        let imageTag = "";
        if (h.image && h.image !== "") {
            const urlImage = "https://corsproxy.io/?" + encodeURIComponent(h.image); // utilisation de l'ia 
            imageTag = `<img src="${urlImage}" style="width:100%">`;
        }

        carte.innerHTML = `
            ${imageTag}
            <h3>${h.name}</h3>
            <p>Pouvoir: ${h.power}</p>
            <p>Ville: ${h.city}</p>
            <button onclick="deleteHero(${h.id})">Supprimer</button>

        `;
        container.appendChild(carte);
    });
}

// Ajouter un héros
document.getElementById("addHeroForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const nouveau = {
        id: Date.now(),
        name: document.getElementById("heroName").value,
        power: document.getElementById("heroPower").value,
        city: document.getElementById("heroCity").value,
        image: "" 
    };

    let liste = JSON.parse(localStorage.getItem("heroes")) || [];
    liste.push(nouveau);
    localStorage.setItem("heroes", JSON.stringify(liste));
    displayHeroes(liste);
    this.reset();
});

// Supprimer un héros
function deleteHero(id) {
    let liste = JSON.parse(localStorage.getItem("heroes"));
    let nouvelleListe = liste.filter(h => h.id !== id);
    localStorage.setItem("heroes", JSON.stringify(nouvelleListe));
    displayHeroes(nouvelleListe);
}
loadHeroes();