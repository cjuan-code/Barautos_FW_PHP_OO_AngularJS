function login_form() {

	$( document ).on("click","#login_link",function() {
		$("#login_complete").hide();
		$("#out").hide();
		$("#register_complete").show();
		document.getElementById("titulo").innerHTML = "Register";
		$(".card").css("height","360");
		$(".card-footer").css("padding-top","23px");
	});
	
}

function register_form() {

	$ ( document ).on("click","#register_link",function() {
		$("#register_complete").hide();
		$("#recover_div").hide();
		$("#login_complete").show();
		$("#out").show();
		document.getElementById("titulo").innerHTML = "Login";
		$(".card").css("height","290");
		$(".card-footer").css("padding-top","27px");
	});
}


function recover_form() {
	
	$("#login_complete").hide();
	$("#out").hide();
	$("#recover_div").show();
	document.getElementById("titulo").innerHTML = "Recover password";
	$(".card").css("height","200");

}

function recover_password_form() {

	$("#login_complete").hide();
	$("#out").hide();
	$("#recover_password").show();
	document.getElementById("titulo").innerHTML = "Recover password";
	$(".card").css("height","230");

}


function live_validation() {
	
	var username = $('[name=username_reg]');
	var email = $('[name=email]');
	var pass = $('[name=pass]');
	var cpass = $('[name=cpass]');

	var email_recover = $('[name=recover_email]');
	var pass_recover = $('[name=pass_recover]');
	var cpass_recover = $('[name=cpass_recover]');

	
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


	email_recover.keyup(function(){
		check_email();
		confirm_all_ok_recover();
		$(".card-footer").css("padding-top","23px");
		$(".card").css("height","200");
	});

	pass_recover.keyup(function(){
		coincidePassword();
		confirm_all_ok_recover();
		$(".card-footer").css("padding-top","23px");
		$(".card").css("height","260");
	});

	cpass_recover.keyup(function(){
		coincidePassword();
		confirm_all_ok_recover();
		$(".card-footer").css("padding-top","23px");
		$(".card").css("height","260");
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

function confirm_all_ok_recover() {

	var pass = localStorage.getItem('pass');

	if (pass=='ok') {
		recover_password_button.disabled = false;
		localStorage.removeItem('user');
		localStorage.removeItem('email');
		localStorage.removeItem('pass');
	} else {
		recover_password_button.disabled = true;
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
	var email1 = document.recover_form.recover_email;
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


	if (email1.value.length==0) {
		localStorage.removeItem('email');
	} else {
		if (val.test(email1.value)) {
			localStorage.setItem('email', 'ok');
			recover_button.disabled = false;
		} else {
			localStorage.removeItem('email');
			recover_button.disabled = true;
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
	var span1 = $(".span_pass_recover");
	var pass_recover = $('[name=pass_recover]');
	var cpass_recover = $('[name=cpass_recover]');
	var valor3 = pass_recover.val();
	var valor4 = cpass_recover.val();

	span.hide();
	span.show().removeClass();

	span1.hide();
	span1.show().removeClass();

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


	if (valor3.length < 6) {
		document.getElementById('span_pass_recover').innerHTML = "Se necesitan mas de 6 caracteres";
		document.getElementById('span_pass_recover').className = 'negacion';
		localStorage.removeItem('pass');
	} else {
		if(valor3 != valor4){
			document.getElementById('span_pass_recover').innerHTML = negacion;
			document.getElementById('span_pass_recover').className = 'negacion';
			localStorage.removeItem('pass');
		} else if(valor3.length==0 || valor3==""){
			document.getElementById('span_pass_recover').innerHTML = vacio;
			document.getElementById('span_pass_recover').className = 'negacion';
			localStorage.removeItem('pass');
		} else if (valor4.length==0 || valor4==""){
			document.getElementById('span_pass_recover').innerHTML = vacio;
			document.getElementById('span_pass_recover').className = 'negacion';
			localStorage.removeItem('pass');
		} else if(valor3==valor4){
			document.getElementById('span_pass_recover').innerHTML = confirmacion;
			document.getElementById('span_pass_recover').className = 'confirmacion';
			localStorage.setItem('pass', 'ok');
		}
	}
	
}

function check_recover() {
	var url = window.location.href;

	url = url.split('/');

	if (url[4]=="recover") {
		recover_password_form();
	}

}

function ini_fs(type) {

	var config = {
		apiKey: apiKeySL,
		authDomain: domainSL,
		databaseURL: urlSL,
		projectId: idSL,
		storageBucket: "",
		messagingSenderId: pjSL
	};
	firebase.initializeApp(config);

	if (type=="GH_SL") { // GitHub SL

		var provider = new firebase.auth.GithubAuthProvider();
		var authService = firebase.auth();

		authService.signInWithPopup(provider)
		.then(function(result) {

			var tk = 'GH-' + result.user.uid;

			var usr = result.user.displayName.split(" ");
			
			if (usr.length<2) {
				username = usr[0];
			} else {
				username = usr[0].slice(0,1);
				username += usr[1].slice(0,3);
			}
			
			username = username.toLowerCase();

			friendlyURL('?page=login&op=social_login').then(function(data) {
				ajaxPromise(data, 'POST', 'JSON', {id : tk, user : username, mail : result.user.email, photo : result.user.photoURL})
				.then(function(result_sl) {
					
					localStorage.setItem('token', result_sl);
					last_page = localStorage.getItem('location');

					window.location.href = last_page;
				})
			});
		}).catch(function(error) {

			var errorCode = error.code;
			console.log(errorCode);
			var errorMessage = error.message;
			console.log(errorMessage);
			var email = error.email;
			console.log(email);
			var credential = error.credential;
			console.log(credential);
		});

	} else if (type=="G_SL") { // Google SL

		var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
    
        var authService = firebase.auth();

		authService.signInWithPopup(provider)
		.then(function(result) {

			var tk = 'GM-' + result.user.uid;

			var usr = result.user.displayName.split(" ");

			if (usr.length<2) {
				username = usr[0];
			} else {
				username = usr[0].slice(0,1);
				username += usr[1].slice(0,3);
			}
			
			username = username.toLowerCase();

			friendlyURL('?page=login&op=social_login').then(function(data) {
				ajaxPromise(data, 'POST', 'JSON', {id : tk, user : username, mail : result.user.email, photo : result.user.photoURL})
				.then(function(result_sl) {
					
					localStorage.setItem('token', result_sl);
					last_page = localStorage.getItem('location');

					window.location.href = last_page;
				})
			});
		})
		.catch(function(error) {
			console.log('Se ha encontrado un error:', error);
		});
	}
}

function GH_SL() {

	$( document ).on("click","#gh_sl",function() {
		ini_fs("GH_SL");
	});

}

function G_SL() {
	$( document ).on("click","#g_sl",function() {
		ini_fs("G_SL");
	});
}

$ ( document ).ready(function() {
	const register_button = document.getElementById('register_button');
	register_button.disabled = true;

	const recover_button = document.getElementById('recover_button');
	recover_button.disabled = true;

	const recover_password_button = document.getElementById('recover_password_button');
	recover_password_button.disabled = true;

	$( document ).on("click","#recover",function() {
		recover_form();
	});

	login_form();
	register_form();
	live_validation();
	check_recover();
	GH_SL();
	G_SL();
});