function login_user() {

}

function register_user() {

    var user = document.register_form.username_reg;
    var email = document.register_form.email;
    var pass = document.register_form.pass;
	var cpass = document.register_form.cpass;

    // alert("user: "+user.value+" "+
    //       " email: "+email.value+" "+
    //       " pass: "+pass.value+" "+
    //       " cpass: "+cpass.value);
    
    var data = $("#register_form").serialize();
    console.log(data);

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

        // var obj = JSON.parse(msg);
        // console.log(msg);
        // var new_str = asd.slice(2,asd.length-2);
        // console.log('arr rep: '+new_str);
        // var asd_ar = asd.split(",");
        // console.log(" ");
        // console.log(asd_ar);

        // for (row in asd_ar) {
        //     console.log(asd_ar[row]);
        //     // for (row1 in asd_ar[row]) {
        //     //     var str_rp = row1.replace();
        //     // }
        // }

        // if (msg=='si que existeix') {
        //     alert('user_exists');
        // }
        // $('<img></img>').attr('class', 'img-responsive').attr('src', obj.avatar).appendTo('.card-footer');
    })


}