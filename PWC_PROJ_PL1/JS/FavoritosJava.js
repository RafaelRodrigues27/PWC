document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favorites-container");
  const maxItemsPerPage = 9;
  let currentPage = 1;

  // Carregar favoritos do localStorage
  function loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      renderFavorites(favorites);
      setupPagination(favorites);
  }

  // Renderizar favoritos
  function renderFavorites(countries) {
      favoritesContainer.innerHTML = ""; // Limpar contêiner
      if (countries.length === 0) {
          favoritesContainer.innerHTML = "<p>Sem países favoritos ainda!</p>";
          return;
      }

      // Calcular os itens da página atual
      const startIndex = (currentPage - 1) * maxItemsPerPage;
      const endIndex = startIndex + maxItemsPerPage;
      const currentItems = countries.slice(startIndex, endIndex);

      currentItems.forEach(country => {
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

  // Configurar paginação
  function setupPagination(countries) {
      const paginationContainer = document.getElementById("pagination-container");
      paginationContainer.innerHTML = ""; // Limpar paginação
      const totalPages = Math.ceil(countries.length / maxItemsPerPage);

      // Botão Anterior
      const prevButton = document.createElement("button");
      prevButton.className = "btn btn-outline-primary mx-1";
      prevButton.textContent = "Anterior";
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener("click", () => {
          if (currentPage > 1) {
              currentPage--;
              renderFavorites(countries);
              setupPagination(countries);
          }
      });
      paginationContainer.appendChild(prevButton);

      // Botões de Páginas
      for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement("button");
          button.className = "btn btn-outline-primary mx-1";
          button.textContent = i;

          if (i === currentPage) {
              button.classList.add("active");
          }

          button.addEventListener("click", () => {
              currentPage = i;
              renderFavorites(countries);
              setupPagination(countries);
          });

          paginationContainer.appendChild(button);
      }

      // Botão Seguinte
      const nextButton = document.createElement("button");
      nextButton.className = "btn btn-outline-primary mx-1";
      nextButton.textContent = "Seguinte";
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener("click", () => {
          if (currentPage < totalPages) {
              currentPage++;
              renderFavorites(countries);
              setupPagination(countries);
          }
      });
      paginationContainer.appendChild(nextButton);
  }

  // Remover país dos favoritos
  window.removeFavorito = function (countryName) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites = favorites.filter(country => country.name.common !== countryName);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      loadFavorites();
  };

  // Adicionar um contêiner para paginação no HTML
  const paginationContainer = document.createElement("div");
  paginationContainer.id = "pagination-container";
  paginationContainer.className = "text-center mt-4";
  favoritesContainer.parentElement.appendChild(paginationContainer);

  loadFavorites();
});
