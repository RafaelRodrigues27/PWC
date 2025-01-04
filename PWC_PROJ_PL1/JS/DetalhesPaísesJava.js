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

// Função para renderizar os detalhes do país em formato de tabela
function renderCountryDetails(country) {
  const container = document.getElementById("countryDetailsContainer");
  container.innerHTML = ""; // Limpa o container

  // Criar tabela para exibir detalhes
  const table = document.createElement("table");
  table.classList.add("table", "table-bordered", "table-striped");

  // Adicionar cabeçalho
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th scope="col">Campo</th>
      <th scope="col">Detalhe</th>
    </tr>
  `;
  table.appendChild(thead);

  // Adicionar corpo da tabela
  const tbody = document.createElement("tbody");

  // Adicionar linhas com os detalhes
  addTableRow(tbody, "Nome Oficial", country.name.official);
  addTableRow(tbody, "Bandeira", `<img src="${country.flags.png}" alt="Bandeira de ${country.name.official}" class="img-fluid" style="max-width: 100px;">`);
  addTableRow(tbody, "Capital", country.capital ? country.capital[0] : "N/A");
  addTableRow(tbody, "Região", country.region);
  addTableRow(tbody, "Sub-região", country.subregion || "N/A");
  addTableRow(tbody, "População", country.population.toLocaleString());
  addTableRow(tbody, "Idiomas", country.languages ? Object.values(country.languages).join(", ") : "N/A");
  addTableRow(tbody, "Moeda", country.currencies
    ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(", ")
    : "N/A"
  );

  table.appendChild(tbody);
  container.appendChild(table);
}

// Função para adicionar uma linha na tabela
function addTableRow(tbody, field, detail) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><strong>${field}</strong></td>
    <td>${detail}</td>
  `;
  tbody.appendChild(row);
}

// Buscar e renderizar os detalhes do país ao carregar a página
if (countryCode) {
  fetchCountryDetails(countryCode);
} else {
  document.getElementById("countryDetailsContainer").innerHTML = "<p>Código do país não encontrado.</p>";
}
