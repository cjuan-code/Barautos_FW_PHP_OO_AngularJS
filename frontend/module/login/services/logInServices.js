barautos.factory('logInServices', ['services', 'localStorageServices', '$rootScope', function(services, localStorageServices, $rootScope) {
    var service = {loadMenu: loadMenu};
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
            });
        } else {
            $rootScope.login_red = true;
            $rootScope.profile = false; 
        }
    }
}]);