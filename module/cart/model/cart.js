/* Recalculate cart */
function recalculateCart() {
    
    var subtotal = 0;

     /* Set rates + misc */

    //  var taxRate = 0.05;
    //  var shippingRate = 15.00; 
     var fadeTime = 300; 

    /* Sum up row totals */
    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */

    // var tax = subtotal * taxRate;
    // var shipping = (subtotal > 0 ? shippingRate : 0);
    // var total = subtotal + tax + shipping;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        
        $('#cart-subtotal').html(subtotal.toFixed(2));
        // $('#cart-tax').html(tax.toFixed(2));
        // $('#cart-shipping').html(shipping.toFixed(2));
        // $('#cart-total').html(total.toFixed(2));

        if (subtotal == 0) {
        $('.checkout').fadeOut(fadeTime);
        } else {
        $('.checkout').fadeIn(fadeTime);
        }

        $('.totals-value').fadeIn(fadeTime);
    });
}

/* Update quantity */
function updateQuantity(quantityInput) {
    
    var fadeTime = 300; 

    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;
    
    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
      $(this).fadeOut(fadeTime, function() {
        $(this).text(linePrice.toFixed(2));
        recalculateCart();
        $(this).fadeIn(fadeTime);
      });
    });  
}

/* Remove item from cart */

function removeItem(removeButton) {

    var fadeTime = 300;

    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {

        var car_id = removeButton.getAttribute('id');
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

        productRow.remove();
        recalculateCart();        
    });
}

function assign_actions() {
    /* Assign actions */

    $(document).on('change', '.product-quantity input', function() {
        updateQuantity(this);
    });
  
    $(document).on('click', '.product-removal button', function() {
        removeItem(this);
    });

    $(document).on('click', '.checkout', function() {
        var token = localStorage.getItem('token');

        if (token) {
            var user = localStorage.getItem('user');

            $('.product').each(function() {
                
                var product = $(this).children('.product-removal').children('.remove-product')[0].id;
                var qty = $(this).children('.product-quantity').children('.inp_qty')[0].value;
                var linePrice = $(this).children('.product-line-price').text();

                ajaxPromise('module/cart/controller/controller_cart.php.?op=line&prod='+product+'&qty='+qty+'&price='+linePrice)



                console.log("mat: "+product);
                console.log("qty: "+qty);
                console.log("linePrice: "+linePrice);
                console.log(" ");
            });

            ajaxPromise('module/cart/controller/controller_cart.php.?op=factura&=user'+user+'&total='+total)

            var total = $('#cart-subtotal').text();
            console.log("total: "+total);
            console.log(" ");
        } else {
            window.location.href = 'index.php?page=controller_login&op=list';
        }
    });

}

function load_cars() {

    var cars_mat = JSON.parse(localStorage.getItem('cart'));

    if (cars_mat) {
        for (i=0; i <= ((cars_mat.length)-1); i++) {

            if (i==0) {
                var consulta = "SELECT/v.*,/i.img,/s.stock/FROM/vehicles/v/INNER/JOIN/img/i/INNER/JOIN/stock/s/ON/v.matricula=i.matricula/AND/v.matricula=s.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.matricula='" + cars_mat[i] + "'";
            } else {
                consulta += "/UNION/SELECT/v.*,/i.img,/s.stock/FROM/vehicles/v/INNER/JOIN/img/i/INNER/JOIN/stock/s/ON/v.matricula=i.matricula/AND/v.matricula=s.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.matricula='" + cars_mat[i] + "'";
            }
        }
    
        ajaxPromise('module/cart/controller/controller_cart.php.?op=cars&con='+consulta, 'GET', 'JSON')
    
        .then(function(data_cart) {
            cont = 0;
    
            for (row in data_cart) {
    
                $('<div></div>').attr('class', 'product prod_'+cont).appendTo('.shopping-cart');
                $('<div></div>').attr('class', 'product-image img_'+cont).appendTo('.prod_'+cont);
                $('<img></img>').attr('src', data_cart[row].img).appendTo('.img_'+cont);
                $('<div></div>').attr('class', 'product-details det_'+cont).appendTo('.prod_'+cont);
                $('<div>'+ data_cart[row].marca + " " + data_cart[row].modelo +'</div>').attr('class', 'product-title').appendTo('.det_'+cont);
                $('<div>'+ data_cart[row].precio/1000 +'</div>').attr('class', 'product-price').appendTo('.prod_'+cont);
                $('<div></div>').attr('class', 'product-quantity quan_'+cont).appendTo('.prod_'+cont);
                $('<input type="number" value="1" min="1" max="'+ data_cart[row].stock +'"></input>').attr('class', 'inp_qty').appendTo('.quan_'+cont);
                $('<div></div>').attr('class', 'product-removal rm_'+cont).appendTo('.prod_'+cont);
                $('<button>Remove</button>').attr('class', 'remove-product').attr('id', data_cart[row].matricula).appendTo('.rm_'+cont);
                $('<div>'+ data_cart[row].precio/1000 +'</div>').attr('class', 'product-line-price').appendTo('.prod_'+cont);
                cont++;
            }
    
            load_total();
            recalculateCart();
        })
    } else {
        load_total();
        recalculateCart();
    }  

}

function load_total() {

    $('<div></div>').attr('class', 'totals').appendTo('.shopping-cart');
    $('<div></div>').attr('class', 'totals-item').appendTo('.totals');
    $('<label>Total</label>').appendTo('.totals-item');
    $('<div>0</div>').attr('class', 'totals-value').attr('id', 'cart-subtotal').appendTo('.totals-item');
    $('<button>Checkout</button>').attr('class', 'checkout').appendTo('.shopping-cart');

}

function load_divs() {

    $('<h1>Shopping Cart</h1>').appendTo('#main');
    $('<div></div>').attr('class', 'shopping-cart').appendTo('#main');
    $('<div></div>').attr('class', 'column-labels').appendTo('.shopping-cart');
    $('<label>Image</label>').attr('class', 'product-image').appendTo('.column-labels');
    $('<label>Product</label>').attr('class', 'product-details').appendTo('.column-labels');
    $('<label>Price</label>').attr('class', 'product-price').appendTo('.column-labels');
    $('<label>Quantity</label>').attr('class', 'product-quantity').appendTo('.column-labels');
    $('<label>Remove</label>').attr('class', 'product-removal').appendTo('.column-labels');
    $('<label>Total</label>').attr('class', 'product-line-price').appendTo('.column-labels');
    load_cars();

}

$(document).ready(function() {

    localStorage.setItem('location', 'index.php?page=controller_cart&op=list');
    load_divs();
    assign_actions();
    
});