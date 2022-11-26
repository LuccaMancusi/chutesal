//funções para verificar e validar e-mail/senha
function validateFields(){
    const nameValid = isEmailValid();
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();
    document.getElementById('login-button').disabled = !emailValid || !passwordValid || !nameValid
}

function isEmailValid(){
    const email = document.getElementById("email").value;
    if(!email){
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid(){
    const password = document.getElementById("password").value;
    if(!password){
        return false;
    }
    return true;
}

function isNameValid(){
    const name = document.getElementById("name").value;
    const padrao = /[^a-zà-ú]/gi;

    var valida_nome = name.match(padrao);

    if(valida_nome || !name){
        return false;
    }
    return true;
}

function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email);
}