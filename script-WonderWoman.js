// ========================================
// 🎯 INSTRUCTIONS
// ========================================
// 1. Changez l'ID du héros ci-dessous
// 2. Personnalisez l'affichage HTML
// 3. Ajoutez du CSS dans index.html si vous voulez
// 4. Faites des commits réguliers !
// ========================================

const heroId = 720; // 👈 CHANGEZ CET ID !

// Liste des IDs disponibles :
// Spider-Man: 620, Batman: 70, Iron Man: 346, Superman: 644
// Wonder Woman: 720, Hulk: 332, Thor: 659, Flash: 263
const myToken = "6570e44801f81594f8a913d3e21be5ab"; // Ajoutez le token donné dans le cours
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

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const heroImageUrl = "https://corsproxy.io/?" + encodeURIComponent(data.image.url);

    // Mettre à jour le titre
    document.getElementById('hero-name').textContent = data.name;

    // Remplir la div portrait
    document.getElementById('hero-portrait').innerHTML = `
      <img src="${heroImageUrl}" alt="${data.name}">
      <div class="name">${data.name}</div>
      <div class="subtitle">${data.biography['full-name']} – ${data.biography['place-of-birth']}</div>
      <div class="stats">
        <div class="stat"><label>Intelligence</label><div class="bar"><div class="bar-fill" style="width:${data.powerstats.intelligence}%"></div></div></div>
        <div class="stat"><label>Force</label><div class="bar"><div class="bar-fill" style="width:${data.powerstats.strength}%"></div></div></div>
        <div class="stat"><label>Vitesse</label><div class="bar"><div class="bar-fill" style="width:${data.powerstats.speed}%"></div></div></div>
        <div class="stat"><label>Durabilité</label><div class="bar"><div class="bar-fill" style="width:${data.powerstats.durability}%"></div></div></div>
        <div class="stat"><label>Puissance</label><div class="bar"><div class="bar-fill" style="width:${data.powerstats.power}%"></div></div></div>
        <div class="stat"><label>Combat</label><div class="bar"><div class="bar-fill" style="width:${data.powerstats.combat}%"></div></div></div>
      </div>
    `;

    // Remplir la div détails
    document.getElementById('hero-details').innerHTML = `
      <div class="section">
        <h2>Biographie</h2>
        <div class="row"><span>Nom complet :</span> <span>${data.biography['full-name']}</span></div>
        <div class="row"><span>Alter-egos :</span> <span>${data.biography['alter-egos']}</span></div>
        <div class="row"><span>Éditeur :</span> <span>${data.biography['publisher']}</span></div>
        <div class="row"><span>1ère apparition :</span> <span>${data.biography['first-appearance']}</span></div>
        <div class="row"><span>Naissance :</span> <span>${data.biography['place-of-birth']}</span></div>
        <div class="aliases">
          ${data.biography['aliases'].map(alias => `<span>${alias}</span>`).join('')}
        </div>
      </div>

      <div class="section">
        <h2>Apparence</h2>
        <div class="row"><span>Genre :</span> <span>${data.appearance['gender']}</span></div>
        <div class="row"><span>Race :</span> <span>${data.appearance['race']}</span></div>
        <div class="row"><span>Taille :</span> <span>${data.appearance['height'][1]}</span></div>
        <div class="row"><span>Poids :</span> <span>${data.appearance['weight'][1]}</span></div>
        <div class="row"><span>Yeux :</span> <span>${data.appearance['eye-color']}</span></div>
        <div class="row"><span>Cheveux :</span> <span>${data.appearance['hair-color']}</span></div>
      </div>

      <div class="section">
        <h2>Travail</h2>
        <div class="row"><span>Occupation :</span> <span>${data.work['occupation']}</span></div>
      </div>

      <div class="section">
        <h2>Connexions</h2>
        <div class="row"><span>Groupes :</span> <span>${data.connections['group-affiliation']}</span></div>
        <div class="row"><span>Famille :</span> <span>${data.connections['relatives']}</span></div>
      </div>
    `;
  })
  .catch(err => {
    document.getElementById('hero-details').innerHTML = "<p>Erreur lors du chargement du héros.</p>";
    console.error(err);
  });
