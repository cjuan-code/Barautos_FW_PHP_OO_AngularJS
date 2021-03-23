function login_user() {

    var data = $("#login_form").serialize();

    ajaxPromise("module/login/controller/controller_login.php.?op=login&" + data)

    .then(function(data_login) {

        if (data_login=="user not exists") {
            document.getElementById('span_pass_log').innerHTML = "El usuario no existe";
		    document.getElementById('span_pass_log').className = 'negacion';
        } else if (data_login=="pass dont match") {
            document.getElementById('span_pass_log').innerHTML = "La contraseña no coincide";
		    document.getElementById('span_pass_log').className = 'negacion';
        } else {
            localStorage.setItem('token', data_login);
            last_page = localStorage.getItem('location');

            window.location.href = last_page;
        }
        
    })
}

function register_user() {

    var data = $("#register_form").serialize();

    ajaxPromise("module/login/controller/controller_login.php.?op=register&" + data)

    .then(function(msg) {

        if (msg=='user exists') {
            document.getElementById('span_pass').innerHTML = "El usuario ya existe";
		    document.getElementById('span_pass').className = 'negacion';
        } else if (msg=='email used') {
            document.getElementById('span_pass').innerHTML = "El email ya esta en uso";
		    document.getElementById('span_pass').className = 'negacion';
        } else if (msg=='user registered') {
            document.getElementById('span_pass').innerHTML = "Se ha registrado correctamente";
		    document.getElementById('span_pass').className = 'confirmacion';
            setTimeout(window.location.href = "index.php?page=controller_login&op=list", 3000);
        } else if (msg=='user not registered') {
            document.getElementById('span_pass').innerHTML = "No se ha registrado";
		    document.getElementById('span_pass').className = 'negacion';
        }
    })

}