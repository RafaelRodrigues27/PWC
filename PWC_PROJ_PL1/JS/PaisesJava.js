document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://restcountries.com/v3.1/all";
    const countryCardsContainer = document.getElementById("country-cards");
    const paginationContainer = document.querySelector(".pagination");
    const searchForm = document.querySelector(".search-container form");
    const searchInput = document.querySelector(".search-container input[name='search']");
    const itemsPerPage = 9;
    let countriesData = [];
    let currentPage = 1;
  
    // Function to add a country to the favorites in WebStorage
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
  
    // Function to render country cards
    function renderCountryCards(page = 1, filteredData = countriesData) {
        countryCardsContainer.innerHTML = ""; 
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage; 
        const countriesToShow = filteredData.slice(start, end); 
  
        // Creates a card for each country
        countriesToShow.forEach(country => {
            const card = document.createElement("div");
            card.className = "col card-country"; 
            card.innerHTML = `
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                <h5>${country.name.common}</h5>
                <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Idioma:</strong> ${Object.values(country.languages).join(", ")}</p>
                <button class="btn btn-primary" onclick="window.location.href = 'DetalhesPaíses.html?code=${country.cca3}'">Ver Detalhes</button>
                <button class="btn btn-success">Adicionar aos Favoritos</button>
            `;
  
            const addToFavoritesButton = card.querySelector(".btn-success");
            addToFavoritesButton.addEventListener("click", () => addFavoritos(country));
  
            countryCardsContainer.appendChild(card);
        });
    }
  
    // Render pagination controls
    function renderPagination(filteredData = countriesData) {
        paginationContainer.innerHTML = ""; 
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
        // Function to create pagination items
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
  
        // Previous button if not on the first page
        if (currentPage > 1) {
            paginationContainer.appendChild(createPageItem(currentPage - 1, "Anterior"));
        }
  
        // Create page number buttons for each page
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.appendChild(createPageItem(i)); // Add page number buttons
        }
  
        // Add "Next" button if not on the last page
        if (currentPage < totalPages) {
            paginationContainer.appendChild(createPageItem(currentPage + 1, "Próximo"));
        }
    }
  
    // Search function
    function handleSearch(event) {
        event.preventDefault(); 
        const searchTerm = searchInput.value.trim().toLowerCase();
  
        if (searchTerm === "") {
            currentPage = 1;
            renderCountryCards(currentPage);
            renderPagination();
        } else {
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
  
    // Fetch country data from the API 
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            countriesData = data; 
            renderCountryCards(currentPage); 
            renderPagination();
        })
        .catch(error => console.error("Erro ao carregar dados da API:", error));
  
    searchForm.addEventListener("submit", handleSearch);
  
    // addFavoritos function globally
    window.addFavoritos = addFavoritos;
});
