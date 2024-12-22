var cloneOriginalCard = $(".card-filme").clone();
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
});