/*var cloneOriginalCard = $(".card-filme").clone();
$('btn-search').on('click',function(){

    var valorPesquisa = $('#titulo').val();

    $('.lista-filmes(1)').html('');

    $.ajax({
        method: 'GET',
        url: 'http://www.omdbapi.com/i=tt3896198&apikey=f189c00c&s=' + valorPesquisa
    }).done(function(dados){
        console.log(dados);

        //1 forma
        for(var i=0; i< dados.Search.lenght; i++) {
            console.log(dados.Search[i]);
            var cloneCard = cloneOriginalCard.clone();
            $('.titulo-filme', cloneCard).html("<b>Nome: </b>", filme.Title);
            //$('.titulo-filme', cloneCard).text(dados.Search[i].Title);
            $('.tipo', cloneCard).text("["+ filme.Type +"]");
            $('.imagem-filme', cloneCard).attr("src,dados.Search[i]".Poster);
            $('.ano', cloneCard).text(dados.Search[i].Year);
            $('.lista-filmes').append(cloneCard);
        }

        var objetoFilme = {
            "titulo" : dados.Search[i].Title,
            "tipo": dados.Search[i].Type,
            "ano": dados.Search[i].Year,
            "poster": dados.Search[i].Poster,
        };

        var stringobjetoFilme = JSON.stringify(objetoFilme);

        $('.btn-favoritos', cloneCard).attr("onclick","addFavortios("+ stringObjetoFilme+ ")");

        $('lista-filmes').append(cloneCard);

    });

    function addFavoritos(filme){
        var arrayFilmesFavoritos = [];

        if(localStorage.getItem("filme") === null){
            arrayFilmesFavoritos = [];
        } else {
            arrayFilmesFavoritos = JSON.parse(localStorage.getItem("filme"));
        }

        arrayFilmesFavoritos.push(filme);

        localStorage.setItem("filme", JSON.stringify(filme));
    
        var favoritosStorage = JSON.stringify(arrayFilmesFavoritos)
        localStorage.setItem("filme", favoritosStorage);
    }

    function removeFavoritos(filme){

    }
});*/

document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://restcountries.com/v3.1/all";
    const countryCardsContainer = document.getElementById("country-cards");
  
    // Adicionar país aos favoritos
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
  
    // Renderizar cards dos países
    function renderCountryCards(countries) {
      countries.forEach(country => {
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
  
    // Exibir detalhes do país
    window.viewDetails = function (countryName) {
      alert(`Exibindo detalhes para ${countryName}`);
      // Redirecionar ou exibir detalhes conforme necessário
    };
  
    // Carregar países da API
    fetch(apiURL)
      .then(response => response.json())
      .then(data => renderCountryCards(data))
      .catch(error => console.error("Erro ao carregar dados da API:", error));
  
    // Tornar a função global para o evento onclick
    window.addFavoritos = addFavoritos;
  });

  
  //teste
  