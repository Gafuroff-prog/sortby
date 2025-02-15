import pokemons from "./pokemons.js";

const pokemonContainer = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const sortBy = document.getElementById("sortBy"); // Saralash elementi
const searchButton = document.getElementById("searchButton");


function generator(pokemonList) {
    pokemonContainer.innerHTML = ''; 
    pokemonList.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.img}" alt="${pokemon.name}">
            <p>Type: ${pokemon.type.join(', ')}</p>
            <p>Weight: ${pokemon.weight}</p>
        `;
        pokemonContainer.appendChild(card);
    });
}

function searchPokemons() {
    let filteredPokemons = pokemons;

    const searchValue = searchInput.value.toLowerCase();
    if (searchValue) {
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchValue)
        );
    }

    const selectedType = filterType.value;
    if (selectedType !== "all") {
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.type.includes(selectedType)
        );
    }

    const sortValue = sortBy.value;
    if (sortValue === "alphabeticalAsc") {
        filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "alphabeticalDesc") {
        filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortValue === "weightAsc") {
        filteredPokemons.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
    } else if (sortValue === "weightDesc") {
        filteredPokemons.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
    }

    if (filteredPokemons.length === 0) {
        pokemonContainer.innerHTML = `<p style="color: white; font-size: 70px; margin-top: 120px;">No Pokémon found!</p>`;
        return;
    }

    generator(filteredPokemons);
}

searchButton.addEventListener("click", searchPokemons);
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchPokemons();
    }
});
sortBy.addEventListener("change", searchPokemons); // Saralashni qo‘shish

generator(pokemons);
