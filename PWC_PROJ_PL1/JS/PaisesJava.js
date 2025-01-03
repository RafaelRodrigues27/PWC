document.addEventListener("DOMContentLoaded", () => {
  const apiURL = "https://restcountries.com/v3.1/all";
  const countryCardsContainer = document.getElementById("country-cards");
  const paginationContainer = document.querySelector(".pagination");
  const itemsPerPage = 10;
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

  function renderCountryCards(page = 1) {
      countryCardsContainer.innerHTML = "";
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const countriesToShow = countriesData.slice(start, end);

      countriesToShow.forEach(country => {
          const card = document.createElement("div");
          card.className = "col card-country";
          card.innerHTML = `
              <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
              <h5>${country.name.common}</h5>
              <p>Population: ${country.population.toLocaleString()}</p>
              <button class="btn btn-primary" onclick="viewDetails('${country.name.common}')">Ver Detalhes</button>
              <button class="btn btn-success" onclick='addFavoritos(${JSON.stringify(country)})'>Adicionar aos Favoritos</button>
          `;
          countryCardsContainer.appendChild(card);
      });
  }

  function renderPagination() {
      paginationContainer.innerHTML = "";
      const totalPages = Math.ceil(countriesData.length / itemsPerPage);

      const createPageItem = (page, label = page) => {
          const li = document.createElement("li");
          li.className = `page-item ${page === currentPage ? "active" : ""}`;
          li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
          li.addEventListener("click", () => {
              currentPage = page;
              renderCountryCards(currentPage);
              renderPagination();
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

  fetch(apiURL)
      .then(response => response.json())
      .then(data => {
          countriesData = data;
          renderCountryCards(currentPage);
          renderPagination();
      })
      .catch(error => console.error("Erro ao carregar dados da API:", error));

  window.addFavoritos = addFavoritos;
  window.viewDetails = function (countryName) {
      alert(`Exibindo detalhes para ${countryName}`);
  };
});
