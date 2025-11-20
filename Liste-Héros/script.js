async function loadHeroes() {
    const loader = document.getElementById('loader');
    const savedHeroes = localStorage.getItem('heroes');

    if (savedHeroes) {
        displayHeroes(JSON.parse(savedHeroes));
    } else {
        if (loader) loader.style.display = 'block';

        try {
            const response = await fetch('heroes.json');
            const heroes = await response.json();

            localStorage.setItem('heroes', JSON.stringify(heroes));
            displayHeroes(heroes);
        } catch (error) {
            console.error(error);
        } finally {
            if (loader) loader.style.display = 'none';
        }
    }
}

function displayHeroes(heroes) {
    const container = document.getElementById('heroesList');
    container.innerHTML = '';

    heroes.forEach(hero => {
        const div = document.createElement('div');
        div.className = 'hero-card';
        div.innerHTML = `
            <h3>${hero.superhero}</h3>
            <p><strong>Alter Ego:</strong> ${hero.alter_ego}</p>
            <p><strong>Éditeur:</strong> ${hero.publisher}</p>
            <button onclick="deleteHero(${hero.id})">Supprimer</button>
        `;
        container.appendChild(div);
    });
}

document.getElementById('addHeroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('inputName').value;
    const alterEgo = document.getElementById('inputAlterEgo').value;
    const publisher = document.getElementById('inputPublisher').value;

    const newHero = {
        id: Date.now(),
        superhero: name,
        alter_ego: alterEgo,
        publisher: publisher,
        first_appearance: "Inconnu",
        characters: alterEgo
    };

    let heroes = JSON.parse(localStorage.getItem('heroes')) || [];
    heroes.push(newHero);

    localStorage.setItem('heroes', JSON.stringify(heroes));
    displayHeroes(heroes);
    document.getElementById('addHeroForm').reset();
});

function deleteHero(id) {
    let heroes = JSON.parse(localStorage.getItem('heroes')) || [];
    let remainingHeroes = [];

    heroes.forEach(hero => {
        if (hero.id !== id) {
            remainingHeroes.push(hero);
        }
    });

    localStorage.setItem('heroes', JSON.stringify(remainingHeroes));
    displayHeroes(remainingHeroes);
}

function searchHeroes() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    let heroes = JSON.parse(localStorage.getItem('heroes')) || [];
    let filtered = [];

    heroes.forEach(hero => {
        if (hero.superhero.toLowerCase().includes(query)) {
            filtered.push(hero);
        }
    });

    displayHeroes(filtered);
}

loadHeroes();