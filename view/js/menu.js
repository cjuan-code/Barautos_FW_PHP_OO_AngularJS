function print_login_button() {
    $('<li><a href="index.php?page=controller_login&op=list">Login</a></li>').appendTo('.list_menu');
}

function check_if_login() {

    var token = localStorage.getItem('token');

    if (token) {
        var token = localStorage.getItem('token');

        ajaxPromise("module/login/controller/controller_login.php.?op=menu&tk="+token)

        .then(function(data_token) {
            data_token = JSON.parse(data_token);
                    
            console.log(data_token);
            
            $('<li class="dropdown white-text"><img class="img-responsive dropdown-toggle" data-toggle="dropdown" src="'+data_token.avatar+'">'+data_token.username+'</img></li>').attr('id', 'li_pro').appendTo('.list_menu');
            $('<ul class="dropdown-menu" id="ul_pro"></ul>').appendTo('#li_pro');
            $('<li><a id="log_out">Logout</a></li>').appendTo('#ul_pro');
            
        })

    } else {
        print_login_button();
    }
}

function check_logout() {
    $(document).on("click", '#log_out', function() {
        localStorage.removeItem('token');
        window.location.reload();
    });
}


$(document).ready(function() {
    check_if_login();
    check_logout();
});
