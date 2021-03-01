<?php 

    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . '/module/shop/model/DAOshop.php');

    switch($_GET['op']) {
        
        case 'list':
            include("module/shop/view/shop.html");
            break;

        case 'details_car':
            $daoshop = new DAOshop();
            $res = $daoshop->select_car($_GET['id']);

            if(!empty($res)) {
                $car_info = get_object_vars($res);
                echo json_encode($car_info);
                
            } else {
                echo json_encode("error");
            }

            break;
        
        case 'details_img':
            $daoshop = new DAOshop();
            $res = $daoshop->select_img($_GET['id']);

            if(!empty($res)) {
                $array_img = array();
                foreach ($res as $row) {
                    array_push($array_img, $row);
                }

                echo json_encode($array_img);
                
            } else {
                echo json_encode("error");
            }

            break;

        case 'update_views':
            $daoshop = new DAOshop();
            $res = $daoshop->update_views($_GET['id']);
            break;

        case 'color':
            $daoshop = new DAOshop();
            $res = $daoshop->select_color();

            if(!empty($res)) {
                $array_img = array();
                foreach ($res as $row) {
                    array_push($array_img, $row);
                }

                echo json_encode($array_img);
                
            } else {
                echo json_encode("error");
            }

            break;
        
        case 'funcionamiento':
            $daoshop = new DAOshop();
            $res = $daoshop->select_funcionamiento();

            if(!empty($res)) {
                $array_func = array();
                foreach ($res as $row) {
                    array_push($array_func, $row);
                }

                echo json_encode($array_func);
                
            } else {
                echo json_encode("error");
            }

            break;

        case 'manejo':
            $daoshop = new DAOshop();
            $res = $daoshop->select_manejo();

            if(!empty($res)) {
                $array_manejo = array();
                foreach ($res as $row) {
                    array_push($array_manejo, $row);
                }

                echo json_encode($array_manejo);
                
            } else {
                echo json_encode("error");
            }

            break;

        case 'gps':
            $daoshop = new DAOshop();
            $res = $daoshop->select_gps();

            if(!empty($res)) {
                $array_gps = array();
                foreach ($res as $row) {
                    array_push($array_gps, $row);
                }

                echo json_encode($array_gps);
                
            } else {
                echo json_encode("error");
            }

            break;
            
        case 'wifi':
            $daoshop = new DAOshop();
            $res = $daoshop->select_wifi();

            if(!empty($res)) {
                $array_wifi = array();
                foreach ($res as $row) {
                    array_push($array_wifi, $row);
                }

                echo json_encode($array_wifi);
                
            } else {
                echo json_encode("error");
            }

            break;

        case 'asientos':
            $daoshop = new DAOshop();
            $res = $daoshop->select_asientos();

            if(!empty($res)) {
                $array_asientos = array();
                foreach ($res as $row) {
                    array_push($array_asientos, $row);
                }

                echo json_encode($array_asientos);
                
            } else {
                echo json_encode("error");
            }

            break;

        case 'puertas':
            $daoshop = new DAOshop();
            $res = $daoshop->select_puertas();

            if(!empty($res)) {
                $array_puertas = array();
                foreach ($res as $row) {
                    array_push($array_puertas, $row);
                }

                echo json_encode($array_puertas);
                
            } else {
                echo json_encode("error");
            }

            break;
        
        case 'categorias':
            $daoshop = new DAOshop();
            $res = $daoshop->select_categorias();

            if(!empty($res)) {
                $array_categorias = array();
                foreach ($res as $row) {
                    array_push($array_categorias, $row);
                }

                echo json_encode($array_categorias);
                
            } else {
                echo json_encode("error");
            }

            break;

        case 'marcas':
            $daoshop = new DAOshop();
            $res = $daoshop->select_marcas();

            if(!empty($res)) {
                $array_marcas = array();
                foreach ($res as $row) {
                    array_push($array_marcas, $row);
                }

                echo json_encode($array_marcas);
                
            } else {
                echo json_encode("error");
            }

            break;

        case 'print_cars':

            $con_ = $_GET['con'];
            $consulta = str_replace("/", " ", $con_);

            $daoshop = new DAOshop();
            $res = $daoshop->select_consulta($consulta);

            if(!empty($res)) {
                $array_fil = array();
                foreach ($res as $row) {
                    array_push($array_fil, $row);
                }

                echo json_encode($array_fil);
                
            } else {
                echo json_encode("no");
            }

            break;
    }

?>