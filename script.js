// ========================================
// 🎯 INSTRUCTIONS
// ========================================
// 1. Changez l'ID du héros ci-dessous
// 2. Personnalisez l'affichage HTML
// 3. Ajoutez du CSS dans index.html si vous voulez
// 4. Faites des commits réguliers !
// ========================================

const heroId = 620; // 👈 CHANGEZ CET ID !

// Liste des IDs disponibles :
// Spider-Man: 620, Batman: 70, Iron Man: 346, Superman: 644
// Wonder Woman: 720, Hulk: 332, Thor: 659, Flash: 263
const myToken = ""; // Ajoutez le token donné dans le cours
const apiUrl = `https://superheroapi.com/api.php/${myToken}/${heroId}`;

// Récupérer les données du héros avec fetch()
// et les afficher grâce à Javascript dans le HTML de cette manière :

{{/* <h2>${data.name}</h2>
<img src="${heroImageUrl}" alt="${data.name}" height="200">
<p><strong>Nom complet :</strong> ${data.biography['full-name']}</p>
<p><strong>Éditeur :</strong> ${data.biography.publisher}</p>
<p><strong>Intelligence :</strong> ${data.powerstats.intelligence}/100</p>
<p><strong>Force :</strong> ${data.powerstats.strength}/100</p> */}}

// utilisez heroImageUrl = "https://corsproxy.io/?" + encodeURIComponent(data.image.url);

// N'oubliez pas de gérer les erreurs (avec .catch())