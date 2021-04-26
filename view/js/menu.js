function print_login_button() {
    $('<li><a href="/login/">Login</a></li>').appendTo('.list_menu');
}

function check_if_login() {

    var token = localStorage.getItem('token');

    if (token) {

        friendlyURL('?page=login&op=menu').then(function(data) {
            ajaxPromise("module/login/controller/controller_login.php.?op=menu&tk="+token)

            .then(function(data_token) {
                data_token = JSON.parse(data_token);

                localStorage.setItem('user', data_token.username);

                var user = localStorage.getItem('user');

                $('<li class="dropdown white-text"><a><i class="fa fa-user" aria-hidden="true"></i></a></li>').attr('id', 'li_pro').appendTo('.list_menu');
                $('<ul class="dropdown-menu" id="ul_pro"></ul>').appendTo('#li_pro');
                $('<li><a><span id="img-user"></span></a></li>').appendTo('#ul_pro');
                $('<img class="img-responsive dropdown-toggle" data-toggle="dropdown" src="'+data_token.avatar+'">'+ data_token.username +'</img></span>').appendTo('#img-user');
                $('<li><a id="log_out">Logout</a></li>').appendTo('#ul_pro');

                if (user) {

                } else {
                    if (data_token.items) {
                        var splitted_items = data_token.items.split(',');
        
                        var array_cart = [];
                        
                        for (row in splitted_items) {
                            array_cart.push(splitted_items[row]);
                        }
        
                        localStorage.setItem('cart', JSON.stringify(array_cart));
                    }
                    ajaxPromise("module/cart/controller/controller_cart.php.?op=delete_cart&user="+data_token.user)
                }

            })
        });

        check_time();

    } else {
        print_login_button();
    }
}

function check_logout() {
    $(document).on("click", '#log_out', function() {
        logout();
    });
}

function check_time() {

    var tk = localStorage.getItem('token');

    ajaxPromise("module/login/controller/controller_login.php.?op=time&tk="+tk)

    .then(function(data_time) {
        data_time = JSON.parse(data_time);

        if (Math.floor(Date.now() / 1000) > data_time['exp']) {
            logout();
        }
        
    })

}

function logout() {

    var cart = JSON.parse(localStorage.getItem('cart'));
    var user = localStorage.getItem('user');

    if (cart) {
        for (i=0; i <= ((cart.length)-1); i++) {
            if (i==0) {
                var cart_mats = ''+ cart[i] +'';
            } else {
                cart_mats += '/'+ cart[i] +'';
            }
        }
    
        ajaxPromise("module/cart/controller/controller_cart.php.?op=add_cart&mats="+cart_mats+'&user='+user)
    }

    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('user');
    window.location.reload();
}


$(document).ready(function() {
    check_if_login();
    check_logout();
});
