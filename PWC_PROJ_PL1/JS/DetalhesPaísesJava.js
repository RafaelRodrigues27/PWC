// Obter o parâmetro 'code' da URL
const params = new URLSearchParams(window.location.search);
const countryCode = params.get('code');

// Função para buscar os detalhes do país
async function fetchCountryDetails(code) {
  const url = `https://restcountries.com/v3.1/alpha/${code}`;
  try {
    const response = await fetch(url);
    const [country] = await response.json(); // A API retorna um array com um único objeto
    renderCountryDetails(country);
  } catch (error) {
    console.error("Erro ao buscar os detalhes do país:", error.message);
    document.getElementById("countryDetailsContainer").innerHTML = "<p>Erro ao carregar os detalhes do país.</p>";
  }
}

// Função para renderizar os detalhes do país
function renderCountryDetails(country) {
  const container = document.getElementById("countryDetailsContainer");
  container.innerHTML = ""; // Limpa o container

  // Nome oficial do país
  const name = document.createElement("h1");
  name.innerText = country.name.official;

  // Bandeira do país
  const flag = document.createElement("img");
  flag.src = country.flags.png;
  flag.alt = `Bandeira de ${country.name.official}`;
  flag.classList.add("country-flag");

  // Capital do país
  const capital = document.createElement("p");
  capital.innerHTML = `<strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}`;

  // Região e sub-região
  const region = document.createElement("p");
  region.innerHTML = `<strong>Região:</strong> ${country.region} - ${country.subregion || "N/A"}`;

  // População
  const population = document.createElement("p");
  population.innerHTML = `<strong>População:</strong> ${country.population.toLocaleString()}`;

  // Idiomas
  const languages = document.createElement("p");
  const languageList = country.languages ? Object.values(country.languages).join(", ") : "N/A";
  languages.innerHTML = `<strong>Idiomas:</strong> ${languageList}`;

  // Moeda
  const currencies = document.createElement("p");
  const currencyList = country.currencies
    ? Object.values(country.currencies).map((currency) => `${currency.name} (${currency.symbol})`).join(", ")
    : "N/A";
  currencies.innerHTML = `<strong>Moeda:</strong> ${currencyList}`;

  // Montar os detalhes no container
  container.appendChild(name);
  container.appendChild(flag);
  container.appendChild(capital);
  container.appendChild(region);
  container.appendChild(population);
  container.appendChild(languages);
  container.appendChild(currencies);
}

// Buscar e renderizar os detalhes do país ao carregar a página
if (countryCode) {
  fetchCountryDetails(countryCode);
} else {
  document.getElementById("countryDetailsContainer").innerHTML = "<p>Código do país não encontrado.</p>";
}
