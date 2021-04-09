<?php 

    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . '/module/cart/model/DAOcart.php');

    switch($_GET['op']) {
        
        case 'list':
            include("module/cart/view/cart.html");
            break;
        case 'cars':
            $con_ = $_GET['con'];

            $consulta = str_replace("/", " ", $con_);

            $daocart = new DAOcart();
            $res = $daocart->select_consulta($consulta);

            if (!empty($res)) {
                $array_cars = array();
                foreach ($res as $row) {
                    array_push($array_cars, $row);
                }
                
                echo json_encode($array_cars);
            } else {
                echo json_encode("error");
            }
            break;
        case 'factura':

            $user = $_GET['user'];
            $total = $_GET['total'];

            $daocart = new DAOcart();
            $res = $daocart->insert_factura($user, $total);

            if ($res) {
                echo "factura inserted";
            } else {
                echo "factura not inserted";
            }

            break;
        case 'line':
            $product = $_GET['prod'];
            $qty = $_GET['qty'];
            $linePrice = $_GET['price'];

            $daocart = new DAOcart();
            $res = $daocart->insert_linea($product, $qty, $linePrice);

            if ($res) {
                echo "line inserted";
            } else {
                echo "line not inserted";
            }
            
            break;
        case 'add_cart':

            $prods = $_GET['mats'];
            $user = $_GET['user'];

            $products_split = str_replace('/', ',', $prods);

            $daocart = new DAOcart();
            $res = $daocart->insert_cart($user, $products_split);

            if ($res) {
                echo "sip insert";
            } else {
                echo "nop insert";
            }

            break;
        case 'delete_cart':
            $user = $_GET['user'];

            $daocart = new DAOcart();
            $res = $daocart->delete_cart($user);

            if ($res) {
                echo "sip delete";
            } else {
                echo "nop delete";
            }

            break;
    }

?>