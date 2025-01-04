// Search and procces API info
async function getRandomCountries() {
  const url = "https://restcountries.com/v3.1/all";
  try {
    const response = await fetch(url);
    const countries = await response.json();
    
    // Select 3 random countries
    const randomCountries = getRandomElements(countries, 3);
    renderCountries(randomCountries);
  } catch (error) {
    console.error("Erro ao buscar dados dos países:", error.message);
  }
}

// Random elements from the array (countries)
function getRandomElements(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Render countries on the page
function renderCountries(countries) {
  const container = document.getElementById("randomPaisesContainer");
  container.innerHTML = "";

  //Create Card
  countries.forEach((country) => {
    const card = document.createElement("div");
    card.classList.add("country-card", "text-center");

    card.addEventListener("click", () => {
        window.location.href = `DetalhesPaíses.html?code=${country.cca3}`;
    });

    // Img flag
    const img = document.createElement("img");
    img.src = country.flags.png;
    img.alt = `Bandeira de ${country.name.official}`;
    img.classList.add("country-flag");

    // Name country
    const name = document.createElement("p");
    name.classList.add("country-name");
    name.innerText = country.name.official;

    //connect img and name to card
    card.appendChild(img);
    card.appendChild(name);

    //Add card to container
    container.appendChild(card);
  });
}

window.onload = function () {
  getRandomCountries();
};
