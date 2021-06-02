barautos.factory('logInServices', ['services', 'localStorageServices', '$rootScope', function(services, localStorageServices, $rootScope) {
    var service = {loadMenu: loadMenu, check_time: check_time};
    return service;

    function loadMenu() {

        var token = localStorage.getItem('token');

        if (token) {
            services.post('login', 'menu', {tk: token})
            .then(function(response) {
                localStorageServices.setUser(response.username);
                $rootScope.profileData = response;
                $rootScope.login_red = false;
                $rootScope.profile = true;

                if (response.items) {
                    var splitted_items = response.items.split(',');
        
                    var array_cart = [];
                    
                    for (row in splitted_items) {
                        array_cart.push(splitted_items[row]);
                    }
    
                    localStorage.setItem('cart', JSON.stringify(array_cart));
                }
            });

            this.check_time();

        } else {
            $rootScope.login_red = true;
            $rootScope.profile = false; 
        }
    }

    function check_time() {
        var tk = localStorage.getItem('token');

        services.post('login', 'time', {tk: tk})
        .then(function(data_time) {
            if (Math.floor(Date.now() / 1000) > data_time['exp']) {
                localStorageServices.closeSession();
            }
        });

    }

}]);