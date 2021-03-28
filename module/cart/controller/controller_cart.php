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
    }

?>