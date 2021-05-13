barautos.controller('controller_home', function($scope, categories) {

    cont=3;

    $scope.slides = categories.slice(0,2);
    $scope.cats = categories.slice(0, cont);

    $scope.showMore = function() {
        cont=cont+3;
        $scope.cats = categories.slice(0, cont);

        if (cont>$scope.cats.length) {
            document.querySelector('#show_more').remove();
        }

    };

    $scope.redir_shop = function(categ) {
        localStorage.setItem('categoria', categ);
        window.location.href="#/shop";
    };

});