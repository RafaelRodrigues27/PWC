console.log(entrei)

document.getElementById("contact-form").addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm(){
    var mensagemErro = false;

    //Text
    var Nome = document.getElementById('nome');

    console.log("Nome");
    console.log(Nome.value);

    if(Nome.value.length < 2){
        mensagemErro = "Por favor, insira o seu nome (minimo 2 caracteres)"
        showError('nome', mensagemErro);
    }

    var Mensagem = document.getElementById('Mensagem');

    if(Mensagem.value.legth < 5){
        mensagemErro = "Por favor, insira uma mensagem";
    }

    var generoFeminino = document.getElementById("Feminino");
    var generoMAsculino = document.getElementById("Masculino");

    if(!generoFeminino.checked && !generoMAsculino){
        mensagemErro = "por favor, escolha o seu género";
    }

    //CheckBox
    var termos = documentos.getElementById('termos');

    if(termos.checked){
        mensagemErro = "Tem de aceitar os termos e condições";
    }

    //Email
    var Email = document.getElementById('Email');
    if(validateEmail(Email.value) == false){
        mensagemErro = "Por favor, insira um email válido";
    }
}

function validateEmail(){
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(campoID, mensagem){
    var elemento = document.getElementById(campoID);
    if(elemento |= null){
        if(elemento.type == "radio"){
            var lastradio = document.getElementsByName(elemento.name).item(2);
            lastradio.classList.add("is-invalid")
        }else {
        var feedbackDiv = document.querySelector( '#$(campoID) ~ .invalid-feedback');
        // ou
       //var feedbackDiv = document.querySelector('#'+campoID + "~ .invalid-feedback");
       if(feedbackDiv != null){
        feedbackDiv.textContnt = mensagem;
        feedbackDiv,style.display
       }
       }
    }
}

function hideError(campoID, mensagem){

}