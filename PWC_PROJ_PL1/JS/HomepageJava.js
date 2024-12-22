const carousel = new bootstrap.Carousel('#myCarousel')

var cloneOriginalCard = $(".card-Pais").clone();
$('btn-search').on('click',function(){

    var valorPesquisa = $('#titulo').val();

    $('.lista-paises(1)').html('');

    $.ajax({
        method: 'GET',
        url: 'https://restcountries.com/v3.1/all' + valorPesquisa
    }).done(function(dados){
        console.log(dados);

        //1 forma
        for(var i=0; i< dados.Search.lenght; i++) {
            console.log(dados.Search[i]);
            var cloneCard = cloneOriginalCard.clone();
            $('.nome-pais', cloneCard).html( /*país*/Pais);
            $('.descricao', cloneCard).html( /*descricao*/descricao);
            $('.bandeira-pais', cloneCard).attr("src,dados.Search[i]".bandeira);
            $('.lista-paises').append(cloneCard);
        }

        var objetoPais = {
            "Nome" : dados.Search[i].Title,
            "descricao": dados.Search[i].Type,
            "bandeira-pais": dados.Search[i].Poster,
        };

        var stringobjetoPais = JSON.stringify(objetoPais);

        $('.btn-favoritos', cloneCard).attr("onclick","addFavortios("+ stringobjetoPais+ ")");

        $('lista-paises').append(cloneCard);

    });

    function addFavoritos(paises){
        var arrayPaisesFavoritos = [];


        if(localStorage.getItem("pais") === null){
            arrayPaisesFavoritos = [];
        } else {
            arrayPaisesFavoritos = JSON.parse(localStorage.getItem("pais"));
        }

        arraypaisesFavoritos.push(pais);

        localStorage.setItem("pais", JSON.stringify(pais));
    
        var favoritosStorage = JSON.stringify(arrayPaisesFavoritos)
        localStorage.setItem("pais", favoritosStorage);
    }

    function removeFavoritos(pais){

    }
});