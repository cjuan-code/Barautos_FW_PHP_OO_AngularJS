barautos.factory('localStorageServices', ['$rootScope' , function($rootScope) {
    var service = {startSession: startSession, closeSession, setPage: setPage, setUser: setUser};
    return service;

    function startSession(tk) {
        localStorage.setItem('token', tk);
    }

    function closeSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        localStorage.removeItem('user');
        $rootScope.login_red = true;
        $rootScope.profile = false;
    }

    function setPage(pg) {
        localStorage.setItem('location', pg);
    }

    function setUser(user) {
        localStorage.setItem('user', user);
    }
}]);