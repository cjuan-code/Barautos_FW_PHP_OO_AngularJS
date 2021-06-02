barautos.factory('cartServices', ['$rootScope', 'services', function($rootScope, services) {
    var service = {recalculateCart: recalculateCart, removeItem: removeItem, checkout: checkout};
    return service;

    function recalculateCart(cart = 0) {
    
        var subtotal = 0;
    
        /* Set rates + misc */
        var fadeTime = 300;

        if (cart != 0) {
            for (row in cart) {
                subtotal += cart[row].precio_row;
            }

            subtotal = subtotal.toFixed(2);

            $rootScope.total_price = subtotal;
        } else {
            $rootScope.total_price = 0;
        }
        
        
        /* Update totals display */
        $('.totals-value').fadeOut(fadeTime, function() {
            
            $('#cart-subtotal').html(subtotal);
    
            if (subtotal == 0) {
                $('.checkout').fadeOut(fadeTime);
            } else {
                $('.checkout').fadeIn(fadeTime);
            }
    
            $('.totals-value').fadeIn(fadeTime);
        });
    }

    function removeItem(removeButton) {

        var fadeTime = 300;  
        var car_id = removeButton.data.matricula;
        var serv = this;

        /* Remove row from DOM and recalc cart total */

        angular.element('#'+car_id).slideUp(fadeTime, function() {

            var index = $rootScope.cart.indexOf(car_id);
            $rootScope.cart.splice(index, 1);

            var mats = JSON.parse(localStorage.getItem('cart'));
            var array = [];
    
            for (row in mats) {
                array.push(mats[row]);
            }
            
            var index = array.indexOf(car_id);
            array.splice(index, 1);
    
            if (array.length==0) {
                localStorage.removeItem('cart');
            } else {
                localStorage.setItem('cart', JSON.stringify(array));
            }
    
            angular.element('#'+car_id).remove();
            
            serv.recalculateCart($rootScope.cart);        
        });
    }

    function checkout() {
        var user = localStorage.getItem('user');
        var total = $rootScope.total_price;

        var cart = $rootScope.cart;

        services.post('cart', 'factura', {user: user, total: total});

        for (row in cart) {

            var product = cart[row].matricula;
            var qty = cart[row].qty;
            var linePrice = cart[row].precio_row;

            services.post('cart', 'line', {prod: product, qty: qty, price: linePrice});
        }
    }

}]);