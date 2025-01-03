// Função para buscar e processar dados dos países
async function getRandomCountries() {
  const url = "https://restcountries.com/v3.1/all";
  try {
    const response = await fetch(url);
    const countries = await response.json();
    
    // Selecionar 3 países aleatórios
    const randomCountries = getRandomElements(countries, 3);
    renderCountries(randomCountries);
  } catch (error) {
    console.error("Erro ao buscar dados dos países:", error.message);
  }
}

// Função para selecionar elementos aleatórios de um array
function getRandomElements(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Função para renderizar os países na página
function renderCountries(countries) {
  const container = document.getElementById("randomPaisesContainer");
  container.innerHTML = ""; // Limpa o container antes de renderizar novos países

  countries.forEach((country) => {
    // Criar o card
    const card = document.createElement("div");
    card.classList.add("country-card", "text-center");

    // Adicionar imagem da bandeira
    const img = document.createElement("img");
    img.src = country.flags.png;
    img.alt = `Bandeira de ${country.name.official}`;
    img.classList.add("country-flag");

    // Adicionar o nome do país
    const name = document.createElement("p");
    name.classList.add("country-name");
    name.innerText = country.name.official;

    // Montar o card
    card.appendChild(img);
    card.appendChild(name);

    // Adicionar o card ao container
    container.appendChild(card);
  });
}


// Executar ao carregar a página
window.onload = function () {
  getRandomCountries();
};
