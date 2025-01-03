document.addEventListener("DOMContentLoaded", () => {
  const apiURL = "https://restcountries.com/v3.1/all";
  const countryCardsContainer = document.getElementById("country-cards");
  const paginationContainer = document.querySelector(".pagination");
  const searchForm = document.querySelector(".search-container form");
  const searchInput = document.querySelector(".search-container input[name='search']");
  const itemsPerPage = 9;
  let countriesData = [];
  let currentPage = 1;

  function addFavoritos(country) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.some(fav => fav.name.common === country.name.common)) {
          favorites.push(country);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          alert(`${country.name.common} foi adicionado aos favoritos!`);
      } else {
          alert(`${country.name.common} já está nos favoritos!`);
      }
  }

  function renderCountryCards(page = 1, filteredData = countriesData) {
      countryCardsContainer.innerHTML = "";
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const countriesToShow = filteredData.slice(start, end);

      countriesToShow.forEach(country => {
          const card = document.createElement("div");
          card.className = "col card-country";
          card.innerHTML = `
              <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
              <h5>${country.name.common}</h5>
              <p>Population: ${country.population.toLocaleString()}</p>
              <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
              <p><strong>Idioma:</strong> ${Object.values(country.languages).join(", ")}</p>
              <button class="btn btn-primary" onclick="('${country.name.common}')">Ver Detalhes</button>
              <button class="btn btn-success" onclick='addFavoritos(${JSON.stringify(country)})'>Adicionar aos Favoritos</button>
          `;
          // Add click event listener to redirect to details page
        card.addEventListener("click", () => {
          window.location.href = `DetalhesPaíses.html?code=${country.cca3}`;
      });
          
          countryCardsContainer.appendChild(card);
      });
  }

  function renderPagination(filteredData = countriesData) {
      paginationContainer.innerHTML = "";
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);

      const createPageItem = (page, label = page) => {
          const li = document.createElement("li");
          li.className = `page-item ${page === currentPage ? "active" : ""}`;
          li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
          li.addEventListener("click", () => {
              currentPage = page;
              renderCountryCards(currentPage, filteredData);
              renderPagination(filteredData);
          });
          return li;
      };

      if (currentPage > 1) {
          paginationContainer.appendChild(createPageItem(currentPage - 1, "Previous"));
      }

      for (let i = 1; i <= totalPages; i++) {
          paginationContainer.appendChild(createPageItem(i));
      }

      if (currentPage < totalPages) {
          paginationContainer.appendChild(createPageItem(currentPage + 1, "Next"));
      }
  }

  function handleSearch(event) {
      event.preventDefault(); // Evita o recarregamento da página
      const searchTerm = searchInput.value.trim().toLowerCase();

      if (searchTerm === "") {
          // Se o campo de pesquisa estiver vazio, exibe todos os países
          currentPage = 1;
          renderCountryCards(currentPage);
          renderPagination();
      } else {
          // Filtra os países com base no termo de pesquisa
          const filteredCountries = countriesData.filter(country =>
              country.name.common.toLowerCase().includes(searchTerm)
          );

          if (filteredCountries.length === 0) {
              countryCardsContainer.innerHTML = "<p>Nenhum país encontrado.</p>";
              paginationContainer.innerHTML = "";
          } else {
              currentPage = 1;
              renderCountryCards(currentPage, filteredCountries);
              renderPagination(filteredCountries);
          }
      }
  }

  fetch(apiURL)
      .then(response => response.json())
      .then(data => {
          countriesData = data;
          renderCountryCards(currentPage);
          renderPagination();
      })
      .catch(error => console.error("Erro ao carregar dados da API:", error));

  searchForm.addEventListener("submit", handleSearch);

  window.addFavoritos = addFavoritos;
  window.viewDetails = function (countryName) {
      alert(`Exibindo detalhes para ${countryName}`);
  };
});
