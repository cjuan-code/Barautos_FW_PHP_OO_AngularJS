function print_login_button() {
    $('<li><a href="index.php?page=controller_login&op=list">Login</a></li>').appendTo('.list_menu');
}

function check_if_login() {

    var token = localStorage.getItem('token');

    if (token) {
        alert('Esta log');
    } else {
        print_login_button();
    }
}


$(document).ready(function() {
    check_if_login();
});
