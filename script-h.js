// =========================================================
// VARIABLES GLOBALES (Accès aux éléments HTML)
// =========================================================

// On garde ces variables car elles sont nécessaires pour le reste du projet
const addHeroForm = document.getElementById('addHeroForm');
const searchInput = document.getElementById('searchHeroInput');


// =========================================================
// 1. CHARGEMENT DES DONNÉES ET AFFICHAGE
// =========================================================

/**
 * Lit les héros : d'abord le LocalStorage (mémoire rapide), sinon heroes.json.
 */
async function loadHeroes() {
    // 1. On vérifie s'il existe une liste de héros dans le LocalStorage.
    const savedHeroes = localStorage.getItem('heroes');

    if (savedHeroes) {
        // CAS 1 : LocalStorage trouvé. On affiche directement (chargement instantané).
        
        // On convertit le texte JSON stocké en objets JavaScript.
        displayHeroes(JSON.parse(savedHeroes));
        
    } else {
        // CAS 2 : LocalStorage vide. On charge depuis le fichier heroes.json.
        try {
            // On envoie une requête pour lire le fichier 'heroes.json'.
            const response = await fetch('heroes.json');
            
            // On attend la réponse et on la convertit en objets JavaScript.
            const heroes = await response.json();

            // On sauvegarde cette liste dans le LocalStorage pour les prochaines visites.
            localStorage.setItem('heroes', JSON.stringify(heroes));
            
            // On affiche la liste.
            displayHeroes(heroes);
            
        } catch (error) {
            console.error("Erreur: heroes.json non trouvé ou invalide.", error);
        }
    }
}

/**
 * Prend le tableau de héros et crée leurs cartes HTML sur la page.
 * @param {Array<Object>} heroes - Le tableau des objets héros.
 */
function displayHeroes(heroes) {
    const container = document.getElementById('heroesList');
    container.innerHTML = ''; // On vide le contenu précédent pour rafraîchir la liste
 
    heroes.forEach(hero => {
        // Pour chaque héros, on crée une 'div' (la carte).
        const div = document.createElement('div');
        div.className = 'hero-card';
        div.setAttribute('data-id', hero.id); 
        
        // On insère le contenu de la carte
        div.innerHTML = `
            <h4>${hero.name}</h4>
            <p><strong>Pouvoir:</strong> ${hero.power}</p>
            <p><strong>Ville:</strong> ${hero.city}</p>
            <button class="delete-btn" data-id="${hero.id}">Supprimer</button>
        `;
        container.appendChild(div); // On ajoute la carte à la page.
    });

    // 🚨 AJOUT DE LA SUPPRESSION 🚨
    // On trouve tous les boutons 'Supprimer' pour leur donner une action.
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            // Quand on clique, on récupère l'ID du héros cliqué.
            const heroId = parseInt(event.target.dataset.id);
            deleteHero(heroId); // On appelle la fonction de suppression.
        });
    });
}

/**
 * Supprime un héros spécifique du LocalStorage.
 * @param {number} id - L'ID du héros à supprimer.
 */
function deleteHero(id) {
    // 1. On récupère la liste complète actuelle.
    let heroes = JSON.parse(localStorage.getItem('heroes')) || [];

    // 2. On FILTRE la liste : on garde tous les héros SAUF celui qui a l'ID à retirer.
    const updatedHeroes = heroes.filter(hero => hero.id !== id);

    // 3. On sauvegarde la nouvelle liste dans le LocalStorage.
    localStorage.setItem('heroes', JSON.stringify(updatedHeroes));

    // 4. On rafraîchit l'affichage pour que la carte disparaisse de la page.
    displayHeroes(updatedHeroes);
}


// =========================================================
// 2. GESTION DU FORMULAIRE ET DE LA RECHERCHE
// =========================================================

/**
 * Ajout d'un écouteur pour la soumission du formulaire d'ajout de héros.
 */
addHeroForm.addEventListener('submit', function(event) {
    event.preventDefault(); // On bloque le rechargement de la page.

    // 1. On récupère les valeurs entrées par l'utilisateur.
    const name = document.getElementById('heroName').value.trim();
    const power = document.getElementById('heroPower').value.trim();
    const city = document.getElementById('heroCity').value.trim();
    
    if (!name || !power || !city) return; // Si un champ est vide, on arrête.

    // 2. On crée l'objet du nouveau héros avec un ID unique (basé sur le temps).
    const newHero = {
        id: Date.now(), 
        name: name,
        power: power,
        city: city
    };

    // 3. On récupère la liste actuelle, on ajoute le nouveau héros, et on sauvegarde.
    let heroes = JSON.parse(localStorage.getItem('heroes')) || [];
    heroes.push(newHero);
    localStorage.setItem('heroes', JSON.stringify(heroes));

    // 4. On met à jour l'affichage et on vide le formulaire.
    displayHeroes(heroes);
    addHeroForm.reset();
});

/**
 * Ajout d'un écouteur pour la recherche en temps réel.
 */
searchInput.addEventListener('input', function() {
    // 1. On récupère le terme tapé, en le mettant en minuscules pour la recherche.
    const searchTerm = searchInput.value.toLowerCase().trim();

    // 2. On récupère la liste complète des héros depuis le LocalStorage (la source).
    const allHeroes = JSON.parse(localStorage.getItem('heroes')) || [];

    // 3. On filtre la liste.
    const filteredHeroes = allHeroes.filter(hero => 
        // On vérifie si le terme est inclus dans le nom OU le pouvoir OU la ville.
        hero.name.toLowerCase().includes(searchTerm) ||
        hero.power.toLowerCase().includes(searchTerm) ||
        hero.city.toLowerCase().includes(searchTerm)
    );

    // 4. On affiche la liste réduite (filtrée).
    displayHeroes(filteredHeroes);
});


// =========================================================
// 3. LANCEMENT DE L'APPLICATION
// =========================================================

loadHeroes(); // Démarre le processus de chargement LocalStorage/JSON