//função de registrar
function register(){
    window.location.href='./register.html'
}

function login(){
    window.location.href='./unidades.html'
}

//funções para verificar e validar e-mail/senha
function validateFields(){
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();
    document.getElementById('login-button').disabled = !emailValid || !passwordValid
}

// função para validar e-mail
function isEmailValid(){
    const email = document.getElementById("email").value;
    if(!email){
        return false;
    }
    return validateEmail(email);
}

// função para validar senha
function isPasswordValid(){
    const password = document.getElementById("password").value;
    if(!password){
        return false;
    }
    return true;
}

// função para validar se é e-mail
function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email);
}