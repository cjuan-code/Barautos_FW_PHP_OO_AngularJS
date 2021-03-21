function login_form() {

	$( document ).on("click","#login_link",function() {
		$("#login_complete").hide();
		$("#out").hide();
		$("#register_complete").show();
		document.getElementById("titulo").innerHTML = "Register";
		$(".card").css("height","380");
		$(".card-footer").css("padding-top","23px");
	});
	
}

function register_form() {

	$ ( document ).on("click","#register_link",function() {
		$("#register_complete").hide();
		$("#login_complete").show();
		$("#out").show();
		document.getElementById("titulo").innerHTML = "Login";
		$(".card").css("height","320");
		$(".card-footer").css("padding-top","27px");
	});
}


function live_validation() {
	
	var username = $('[name=username_reg]');
	var email = $('[name=email]');
	var pass = $('[name=pass]');
	var cpass = $('[name=cpass]');
	
	username.keyup(function(){
		check_username();
		confirm_all_ok();
		$(".card-footer").css("padding-top","23px");
		$(".card").css("height","400");
	});

	email.keyup(function(){
		check_email();
		confirm_all_ok();
		$(".card-footer").css("padding-top","23px");
		$(".card").css("height","400");
	});

	pass.keyup(function(){
		coincidePassword();
		confirm_all_ok();
		$(".card-footer").css("padding-top","23px");
		$(".card").css("height","400");
	});

	cpass.keyup(function(){
		coincidePassword();
		confirm_all_ok();
		$(".card-footer").css("padding-top","23px");
		$(".card").css("height","400");
	});
}

function confirm_all_ok() {

	var user = localStorage.getItem('user');
	var email = localStorage.getItem('email');
	var pass = localStorage.getItem('pass');

	if (user=='ok' && email=='ok' && pass=='ok') {
		register_button.disabled = false;
	} else {
		register_button.disabled = true;
	}
}


function check_username() {
	var username = document.register_form.username_reg;
	var span = $(".span_pass");

	span.hide();
	span.show().removeClass();

	if (username.value.length==0) {
		document.getElementById('span_pass').innerHTML = "Se necesita un usuario";
		document.getElementById('span_pass').className = 'negacion';
		localStorage.removeItem('user');	
	} else {
		localStorage.setItem('user', 'ok');
	}
}

function check_email() {
	var email = document.register_form.email;
	var span = $(".span_pass");
	var pttr = /\S+@\S+\.\S+/;

	var val = new RegExp(pttr);

	span.hide();
	span.show().removeClass();

	if (email.value.length==0) {
		document.getElementById('span_pass').innerHTML = "Se necesita un email";
		document.getElementById('span_pass').className = 'negacion';
	} else {
		if (val.test(email.value)) {
			localStorage.setItem('email', 'ok');
		} else {
			document.getElementById('span_pass').innerHTML = "El email tiene que tener la siguiente estructura: example@example.example";
			document.getElementById('span_pass').className = 'negacion';
			localStorage.removeItem('email');
		}
	}
}


function coincidePassword(){

	var pass = $('[name=pass]');
	var cpass = $('[name=cpass]');
	var confirmacion = "Las contraseñas si coinciden";
	var negacion = "No coinciden las contraseñas";
	var vacio = "La contraseña no puede estar vacía";
	var valor1 = pass.val();
	var valor2 = cpass.val();
	var span = $(".span_pass");

	span.hide();
	span.show().removeClass();

	//condiciones dentro de la función
	if (valor1.length < 6) {
		document.getElementById('span_pass').innerHTML = "La contraseña tiene que tener mas de 6 caracteres";
		document.getElementById('span_pass').className = 'negacion';
		localStorage.removeItem('pass');
	} else {
		if(valor1 != valor2){
			document.getElementById('span_pass').innerHTML = negacion;
			document.getElementById('span_pass').className = 'negacion';
			localStorage.removeItem('pass');
		} else if(valor1.length==0 || valor1==""){
			document.getElementById('span_pass').innerHTML = vacio;
			document.getElementById('span_pass').className = 'negacion';
			localStorage.removeItem('pass');
		} else if (valor2.length==0 || valor2==""){
			document.getElementById('span_pass').innerHTML = vacio;
			document.getElementById('span_pass').className = 'negacion';
			localStorage.removeItem('pass');
		} else if(valor1==valor2){
			document.getElementById('span_pass').innerHTML = confirmacion;
			document.getElementById('span_pass').className = 'confirmacion';
			localStorage.setItem('pass', 'ok');
		}
	}
	
}

$ ( document ).ready(function() {
	const register_button = document.getElementById('register_button');
	register_button.disabled = true;

	login_form();
	register_form();
	live_validation();

	localStorage.removeItem('user');
	localStorage.removeItem('email');
	localStorage.removeItem('pass');
});