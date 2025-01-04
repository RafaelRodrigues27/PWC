// Get parameters from the URL 
const params = new URLSearchParams(window.location.search);
const countryCode = params.get('code');

// Function to get details
async function fetchCountryDetails(code) {
  const url = `https://restcountries.com/v3.1/alpha/${code}`;
  try {
    const response = await fetch(url);
    const [country] = await response.json();
    renderCountryDetails(country);
    // in case of an error, it sends a message
  } catch (error) {
    console.error("Erro ao buscar os detalhes do país:", error.message);
    document.getElementById("countryDetailsContainer").innerHTML = "<p>Erro ao carregar os detalhes do país.</p>";
  }
}

// Function to render the details of the country in a table format
function renderCountryDetails(country) {
  const container = document.getElementById("countryDetailsContainer");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.classList.add("table", "table-bordered", "table-striped");

  // Body of the table
  const tbody = document.createElement("tbody");

  // Lines with details
  addTableRow(tbody, "Nome Oficial", country.name.official);
  addTableRow(tbody, "Bandeira", `<img src="${country.flags.png}" alt="Bandeira de ${country.name.official}" class="img-fluid" style="max-width: 100px;">`);
  addTableRow(tbody, "Capital", country.capital ? country.capital[0] : "N/A");
  addTableRow(tbody, "Continente", country.region);
  addTableRow(tbody, "Região do Continente", country.subregion || "N/A");
  addTableRow(tbody, "População", country.population.toLocaleString());
  addTableRow(tbody, "Idiomas", country.languages ? Object.values(country.languages).join(", ") : "N/A");
  addTableRow(tbody, "Moeda", country.currencies
    ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(", ")
    : "N/A"
  );

  table.appendChild(tbody);
  container.appendChild(table);
}

// Function to add a line in the table
function addTableRow(tbody, field, detail) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><strong>${field}</strong></td>
    <td>${detail}</td>
  `;
  tbody.appendChild(row);
}

// Search and render details from the country by loading the page
if (countryCode) {
  fetchCountryDetails(countryCode);
} else {
  document.getElementById("countryDetailsContainer").innerHTML = "<p>Código do país não encontrado.</p>";
}
