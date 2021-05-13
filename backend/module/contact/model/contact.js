function send_email(user, email, text) {

    friendlyURL('?page=contact&op=sendEmail').then(function(data) {
        ajaxPromise(data, 'POST', 'JSON', {name: user, mail : email, content : text})
        
        .then(function(data_toSupport) {
            console.log(data_toSupport);
            toastr.success('Email sended');

        })
    
    });

}


function check_form() {
    document.getElementById('e_name').innerHTML = "";
    document.getElementById('e_email').innerHTML = "";

    var name_ok = true;
    var email_ok = true;
    var content_ok = true;
    var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
    var name = document.getElementById('name').value;
    var email = document.getElementById('mail').value;
    var content = document.getElementById('content').value;

    var regEx = new RegExp(regEmail);

    if (name.length <= 0) {
        name_ok = false;
        document.getElementById('e_name').innerHTML = "Es necesario un nombre";
    }

    if (regEx.test(email)) {
        document.getElementById('e_email').innerHTML = "";
    } else {
        email_ok = false;
        document.getElementById('e_email').innerHTML = "El email no cumple la estructura ' '@' '.' '";
    }

    if (content.length <= 0) {
        content_ok = false;
        document.getElementById('e_content').innerHTML = "Es necesario que escriba algo";
    }

    if (name_ok && email_ok && content_ok) {
        send_email(name, email, content);
    }

}

function check_send() {

    $('body').on('click', '.send_email', function() {
        check_form();
    });
}





$(document).ready(function() {
    check_send();
});