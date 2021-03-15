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


function check_pass() {
	
	var cpass = $('[name=cpass]');
	
	cpass.keyup(function(){
		coincidePassword();
		$(".card-footer").css("padding-top","23px");
		$(".card").css("height","400");
	});
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
	if(valor1 != valor2){
		document.getElementById('span_pass').innerHTML = negacion;
		document.getElementById('span_pass').className = 'negacion';
	}
	if(valor1.length==0 || valor1==""){
		document.getElementById('span_pass').innerHTML = vacio;
		document.getElementById('span_pass').className = 'negacion';
	}
	if (valor2.length==0 || valor2==""){
		document.getElementById('span_pass').innerHTML = vacio;
		document.getElementById('span_pass').className = 'negacion';
	}
	if(valor1==valor2){
		document.getElementById('span_pass').innerHTML = confirmacion;
		document.getElementById('span_pass').className = 'confirmacion';
	}
}


$ ( document ).ready(function() {
	login_form();
	register_form();
	check_pass();
});