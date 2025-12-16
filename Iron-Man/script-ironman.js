// ========================================
// 🎯 INSTRUCTIONS
// ========================================
// 1. Changez l'ID du héros ci-dessous
// 2. Personnalisez l'affichage HTML
// 3. Ajoutez du CSS dans index.html si vous voulez
// 4. Faites des commits réguliers !
// ========================================

const heroId = 346; // 👈 CHANGEZ CET ID ! (346 = Iron Man)

// Liste des IDs disponibles :
// Spider-Man: 620, Batman: 70, Iron Man: 346, Superman: 644
// Wonder Woman: 720, Hulk: 332, Thor: 659, Flash: 263
const myToken = "4905856019427443"; // ⚠️ Remplacez par le token donné dans le cours
const apiUrl = `https://www.superheroapi.com/api.php/${myToken}/${heroId}`;

async function recupDataHero() {
    try {
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(apiUrl)}`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.response === "error") {
            throw new Error(data.error);
        }

        const heroImageUrl = "https://corsproxy.io/?" + encodeURIComponent(data.image.url);

        montrerDataHero(data, heroImageUrl);
    } catch (error) {
        console.error("Errur lors de la récupération des données:", error);
        document.getElementById('hero-info').innerHTML = `
            <p style="color: red; text-align: center;">
                 Erreur: ${error.message}
            </p>
        `;
    }
}

function montrerDataHero(data, heroImageUrl) {
    const heroInfo = document.getElementById('hero-info');

    heroInfo.innerHTML = `
        <div class="hero-card">
            <h2>${data.name}</h2>
            <img src="${heroImageUrl}" alt="${data.name}" height="200">
            <div class="hero-details">
                <p><strong>Nom complet :</strong> ${data.biography['full-name'] || 'Non disponible'}</p>
                <p><strong>Éditeur :</strong> ${data.biography.publisher}</p>
                <p><strong>Lieu de naissance :</strong> ${data.biography['place-of-birth'] || 'Non disponible'}</p>
                <p><strong>Intelligence :</strong> ${data.powerstats.intelligence}/100</p>
                <p><strong>Force :</strong> ${data.powerstats.strength}/100</p>
                <p><strong>Vitesse :</strong> ${data.powerstats.speed}/100</p>
                <p><strong>Endurance :</strong> ${data.powerstats.durability}/100</p>
                <p><strong>Puissance :</strong> ${data.powerstats.power}/100</p>
                <p><strong>Combat :</strong> ${data.powerstats.combat}/100</p>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', recupDataHero);
