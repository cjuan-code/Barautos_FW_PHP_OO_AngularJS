barautos.controller('controller_cart', function($scope, $rootScope, $location, services, cartServices, localStorageServices) {

    localStorageServices.setPage('/cart');

    var cars_mat = JSON.parse(localStorage.getItem('cart'));

    if (cars_mat) {
        for (i=0; i <= ((cars_mat.length)-1); i++) {

            if (i==0) {
                var consulta = "SELECT/v.*,/i.img,/s.stock/FROM/vehicles/v/INNER/JOIN/img/i/INNER/JOIN/stock/s/ON/v.matricula=i.matricula/AND/v.matricula=s.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.matricula='" + cars_mat[i] + "'";
            } else {
                consulta += "/UNION/SELECT/v.*,/i.img,/s.stock/FROM/vehicles/v/INNER/JOIN/img/i/INNER/JOIN/stock/s/ON/v.matricula=i.matricula/AND/v.matricula=s.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.matricula='" + cars_mat[i] + "'";
            }
        }

        services.post('shop', 'select_con', {con: consulta})
        .then(function(response) {

            var total = 0;

            for (row in response) {
                total += (response[row].precio)/1000;
                response[row].precio_row = response[row].precio/1000;
                response[row].precio = response[row].precio/1000;
                response[row].qty = 1;
            }

            $rootScope.total_price = total;
            $rootScope.cart = response;
            cartServices.recalculateCart(response);
        });   
        
    }

    $scope.upd_qty = function() {
        this.data.qty = this.qty;
        var price = this.data.precio*this.qty;
        this.data.precio_row = price;
        cartServices.recalculateCart($rootScope.cart);
    }

    $scope.remove_item = function() {
        cartServices.removeItem(this);
    }

    $scope.checkout = function() {
        var tk = localStorage.getItem('token');

        if (tk) {
            cartServices.checkout();
        } else {
            $location.path('/login');
        }
    }

    cartServices.recalculateCart();

});