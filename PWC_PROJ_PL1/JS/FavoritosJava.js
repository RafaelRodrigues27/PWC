document.addEventListener("DOMContentLoaded", () => {
    const favoritesContainer = document.getElementById("favorites-container");
  
    // Carregar favoritos do localStorage
    function loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      renderFavorites(favorites);
    }
  
    // Renderizar favoritos
    function renderFavorites(countries) {
      favoritesContainer.innerHTML = ""; // Limpar contêiner
      if (countries.length === 0) {
        favoritesContainer.innerHTML = "<p>Sem países favoritos ainda!</p>";
        return;
      }
  
      countries.forEach(country => {
        const card = document.createElement("div");
        card.className = "col card-country";
  
        card.innerHTML = `
          <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
          <h5>${country.name.common}</h5>
          <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
          <p><strong>Idioma:</strong> ${Object.values(country.languages).join(", ")}</p>
          <button class="btn btn-danger" onclick='removeFavorito("${country.name.common}")'>Remover dos Favoritos</button>
        `;
  
        favoritesContainer.appendChild(card);
      });
    }
  
    // Remover país dos favoritos
    window.removeFavorito = function (countryName) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites = favorites.filter(country => country.name.common !== countryName);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      loadFavorites();
    };
  
    loadFavorites();
  });
  