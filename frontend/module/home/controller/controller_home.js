barautos.controller('controller_home', function($scope, $location, categories, localStorageServices) {

    localStorageServices.setPage('/home');

    cont=3;

    $scope.slides = categories.slice(0,2);
    $scope.cats = categories.slice(0, cont);

    $scope.showMore = function() {
        cont=cont+3;
        $scope.cats = categories.slice(0, cont);

        if (cont>$scope.cats.length) {
            angular.element('#show_more').remove();
        }

    };

    $scope.redir_shop = function(categ) {
        localStorage.setItem('categoria', categ);
        $location.path('/shop');
    };

});