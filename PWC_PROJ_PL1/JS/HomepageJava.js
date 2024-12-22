const carousel = new bootstrap.Carousel('#carouselExampleControls')

$.ajax({
    method: 'GET',
    url: 'https://restcountries.com/v3.1/all?fields=' + valorPesquisa

}).done(function(dados){
    console.log(dados);
    var randomIndex = Math.floor(Math.random() * dados.length);
    var randomCountry = dados[randomIndex];

    //1 forma
    for(var i=0; i< dados.Search.lenght; i++) {
        console.log(dados.Search[i]);
        var cloneCard = cloneOriginalCard.clone();
        $('.name', cloneCard).html( /*país*/name);
        $('.flag', cloneCard).attr("src,dados.Search[i]".flag);
    }

    var objetoCountry = {
        "flag" : dados.Search[i].img,
        "name": dados.Search[i].Title,
    };

    var stringobjetoCountry = JSON.stringify(objetoCountry);

    $('lista-paises').append(cloneCard);

});