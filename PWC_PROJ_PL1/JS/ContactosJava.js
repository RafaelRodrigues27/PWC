console.log("Script Loaded");

document.querySelector("form").addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    let mensagemErro = "";

    // Nome Completo Validation
    const nome = document.getElementById('NomeCompleto');
    if (nome.value.trim().length < 2) {
        mensagemErro += "Por favor, insira o seu nome (mínimo 2 caracteres).\n";
    }

    // Gênero Validation
    const generoFeminino = document.getElementById("Feminino");
    const generoMasculino = document.getElementById("Masculino");
    if (!generoFeminino.checked && !generoMasculino.checked) {
        mensagemErro += "Por favor, escolha o seu gênero.\n";
    }

    // Email Validation
    const email = document.getElementById('Email');
    if (!validateEmail(email.value)) {
        mensagemErro += "Por favor, insira um email válido.\n";
    }

    // Telefone Validation
    const telemovel = document.getElementById('Telemovel');
    if (!validatePhoneNumber(telemovel.value)) {
        mensagemErro += "Por favor, insira um número de telefone válido (9 dígitos).\n";
    }

    // Mensagem Validation
    const mensagem = document.getElementById('Mensagem');
    if (mensagem.value.trim().length < 5) {
        mensagemErro += "Por favor, insira uma mensagem (mínimo 5 caracteres).\n";
    }

    if (mensagemErro) {
        alert(mensagemErro);
    } else {
        alert("Formulário enviado com sucesso!");
    }
}

// Helper Functions
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhoneNumber(phone) {
    const regex = /^\d{9}$/; // Matches exactly 9 digits
    return regex.test(phone);
}
