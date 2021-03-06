var barautos = angular.module('barautos', ['ngRoute', 'toastr']);

barautos.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
            .when("/home", {
                templateUrl: "frontend/module/home/view/view_home.html",
                controller: "controller_home",
                resolve: {
                    categories: function(services) {
                        return services.get('home', 'load_cats');
                    }
                }
            }).when("/shop", {
                templateUrl: "frontend/module/shop/view/view_shop.html",
                controller: "controller_shop",
                resolve: {
                    categorias: function(services) {
                        return services.get('shop', 'categorias');
                    },
                    marcas: function(services) {
                        return services.get('shop', 'marcas');
                    },
                    color: function(services) {
                        return services.get('shop', 'color');
                    },
                    funcionamiento: function(services) {
                        return services.get('shop', 'funcionamiento');
                    },
                    manejo: function(services) {
                        return services.get('shop', 'manejo');
                    },
                    gps: function(services) {
                        return services.get('shop', 'gps');
                    },
                    wifi: function(services) {
                        return services.get('shop', 'wifi');
                    },
                    asientos: function(services) {
                        return services.get('shop', 'asientos');
                    },
                    puertas: function(services) {
                        return services.get('shop', 'puertas');
                    }
                }
            }).when("/login", {
                templateUrl: "frontend/module/login/view/view_login.html",
                controller: "controller_login"
            }).when("/login/activate/:tk", {
                resolve: {
                    activateUser: function($route, $location, services, toastr) {

                        services.post('login', 'activate', {tk: $route.current.params.tk})
                        .then(function(response) {

                            if (response==1) {
                                toastr.success('Your user has been activated');
                                $location.path('/login');
                            } else {
                                toastr.error('User not activated');
                            }
                        });
                    }
                }
            }).when("/login/recover/:tk", {
                templateUrl: "frontend/module/login/view/view_login.html",
                controller: "controller_login"
            }).when("/cart", {
                templateUrl: "frontend/module/cart/view/view_cart.html",
                controller: "controller_cart"
            }).when("/contact", {
                templateUrl: "frontend/module/contact/view/view_contact.html",
                controller: "controller_contact"
            }).otherwise({
                templateUrl:"frontend/view/inc/error404.html"
            });
}]);

barautos.run(function($rootScope, $location, $route, services, SocialSignIn, logInServices, localStorageServices) {
    
    logInServices.loadMenu();
    SocialSignIn.ini_fb();

    $rootScope.redir_shop_all = function() {
        localStorage.setItem('categoria', 'all_items');
        $location.path('/shop');
    };

    $rootScope.changelang = function(lang) {

        lang = lang || localStorage.getItem('app-lang') || 'en';
        localStorage.setItem('app-lang', lang);
        var elmnts = document.querySelectorAll('[data-tr]');

        services.postTLT('http://localhost/frontend/view/lang/' + lang + '.json').then(function(response) {

            for (var i = 0; i < elmnts.length; i++) {
                elmnts[i].innerHTML = response.hasOwnProperty(lang) ? response[lang][elmnts[i].dataset.tr] : elmnts[i].dataset.tr;
            }
        });

    }

    $rootScope.logOut = function() {
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

            services.post('cart', 'update_cart', {mats: cart_mats, user: user});

        } else {
            cart_mats = null;
            services.post('cart', 'update_cart', {mats: cart_mats, user: user});
        }

        localStorageServices.closeSession();
    }

    $rootScope.search = function(event) {

        if (event.key == "Enter") {
            var upper = angular.uppercase(this.searchBox);
            var consulta = 'SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/("%1.jpg")/AND/(v.marca/LIKE/("'+upper+'%")/OR/v.modelo/LIKE/("'+upper+'%"))';
            localStorage.setItem("consulta", consulta);
            localStorage.setItem("categoria", "search");

            var page = localStorage.getItem('location');

            if (page=="/shop") {
                $route.reload();
            } else {
                $location.path('/shop');
            }
        }
    }

});