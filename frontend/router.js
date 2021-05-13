var barautos = angular.module('barautos', ['ngRoute']);

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
                tremplateURL: "frontend/module/shop/view/view_shop.html",
                controller: "controller_shop",
                resolve: {
                    items: function(services) {
                        console.log(services.get('shop', 'print_cars', ));
                    }
                }

            });
}]);

barautos.run(function($rootScope) {

    $rootScope.redir_shop_all = function() {
        localStorage.setItem('categoria', 'all_items');
        window.location.href="#/shop";
    };

    $rootScope.changelang = function(lang) {

        lang = lang || localStorage.getItem('app-lang') || 'en';
        localStorage.setItem('app-lang', lang);
        var elmnts = document.querySelectorAll('[data-tr]');

        $.ajax({
            url: 'http://localhost/frontend/view/lang/' + lang + '.json',
                type: 'POST',
                dataType: 'JSON',
                success: function (data) {
                    for (var i = 0; i < elmnts.length; i++) {
                        elmnts[i].innerHTML = data.hasOwnProperty(lang) ? data[lang][elmnts[i].dataset.tr] : elmnts[i].dataset.tr;
                    }
                }
        })

    }


});