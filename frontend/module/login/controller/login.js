function login_user() {

    var usu = document.getElementById('username_login').value;
    var pass = document.getElementById('pass_login').value;

    friendlyURL('?page=login&op=login').then(function(data) {
        
        ajaxPromise(data, 'POST', 'JSON', {user : usu, password : pass})

        .then(function(data_login) {

            if (data_login=="user not exists") {
                toastr.error("El usuario no existe");
            } else if (data_login=="pass dont match") {
                toastr.error("La contraseña no coincide");
            } else if (data_login=="user not activated") {
                toastr.error("El usuario no esta activado");
            } else {
                localStorage.setItem('token', data_login);
                last_page = localStorage.getItem('location');

                window.location.href = last_page;
            }
            
        })
    });
    
}

function register_user() {

    var user = document.getElementById('username_reg').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;


    friendlyURL('?page=login&op=register').then(function(data) {
        ajaxPromise(data, 'POST', 'JSON', {name: user, mail : email, password : pass})

        .then(function(msg) {
 
            if (msg=="user_exists") {
                toastr.error('El usuario ya existe');
            } else if (msg=="email used") {
                toastr.error('El email ya esta en uso');
            } else if (msg=="user registered") {

                toastr.success('User registered');
                localStorage.removeItem('user');
                localStorage.removeItem('email');
                localStorage.removeItem('pass');
                setTimeout(window.location.href = "/login/", 30000);

            } else if (msg=="user not registered") {
                toastr.error("No se ha registrado");
            }
        })

    });
    
}

function recover_password_email() {

    var email = document.getElementById('recover_email').value;

    friendlyURL('?page=login&op=send_mail_recover').then(function(data) {
        ajaxPromise(data, 'POST', 'JSON', {email : email})

        .then(function(data_email) {
            
            if (data_email=='Done!') {
                toastr.success('Revisa tu correo, para recuperar tu contraseña');
            } else {
                toastr.error('Algo ha fallado');
            }
        })
    });
}

function recover_password() {

    var pass = document.getElementById('pass_recover').value;

    var url = window.location.href;

	url = url.split('/');

    var token = url[5];


    friendlyURL('?page=login&op=recover_password').then(function(data) {
        ajaxPromise(data, 'POST', 'JSON', {password : pass, tk : token})

        .then(function(data_recover) {
            
            if (data_recover=='password changed') {
                toastr.success('La contraseña se ha cambiado');
            } else {
                toastr.error('Algo ha fallado');
            }
        })
    });


}