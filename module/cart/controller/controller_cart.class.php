<?php 

    class controller_cart {

        function list() {
            common::loadView('lib_cart.php', VIEW_PATH_CART . 'cart.html');
        }

        function cars() {
            $con = $_POST['con'];
            $json = common::loadModel(MODEL_PATH_CART, "cart_model", "cars", $con);        
            echo json_encode($json);
        }
        
        function factura() {
            $user = $_POST['user'];
            $total = $_POST['total'];

            $array = array();

            array_push($array, $user);
            array_push($array, $total);

            $json = common::loadModel(MODEL_PATH_CART, "cart_model", "factura", $array);

            if ($json) {
                echo json_encode("factura inserted");
            } else {
                echo json_encode("factura not inserted");
            }
        }

        function line() {
            $product = $_POST['prod'];
            $qty = $_POST['qty'];
            $linePrice = $_POST['price'];

            $array = array();

            array_push($array, $product);
            array_push($array, $qty);
            array_push($array, $linePrice);


            $json = common::loadModel(MODEL_PATH_CART, "cart_model", "line", $array);

            if ($json) {
                echo json_encode("line inserted");
            } else {
                echo json_encode("line not inserted");
            }
        }

        function update_cart() {
            
            $prods = $_POST['mats'];
            $user = $_POST['user'];

            $products_split = str_replace('/', ',', $prods);

            $array = array();

            array_push($array, $products_split);
            array_push($array, $user);

            $json = common::loadModel(MODEL_PATH_CART, "cart_model", "update_cart", $array);

            echo json_encode($json);

            if ($json) {
                echo json_encode("sip insert");
            } else {
                echo json_encode("nop insert");
            }

        }

    }

?>