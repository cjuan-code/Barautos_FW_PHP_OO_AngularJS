<?php 

class controller_shop {

    function select_con() {
        $con = $_POST['con'];
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "select_con", $con);
        echo json_encode($json);
    }

    function details_car() {
        $matricula = $_POST['id'];
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "details_car", $matricula);
        echo json_encode($json);
    }

    function details_img() {
        $matricula = $_POST['id'];
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "details_img", $matricula);
        echo json_encode($json);
    }

    function update_views() {
        $matricula = $_POST['id'];
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "update_views", $matricula);
        echo json_encode($json);
    }

    function color() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "color");
        echo json_encode($json);
    }

    function funcionamiento() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "funcionamiento");
        echo json_encode($json);
    }
    
    function manejo() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "manejo");
        echo json_encode($json);
    }

    function gps() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "gps");
        echo json_encode($json);
    }

    function wifi() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "wifi");
        echo json_encode($json);
    }

    function asientos() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "asientos");
        echo json_encode($json);
    }

    function puertas() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "puertas");
        echo json_encode($json);
    }

    function categorias() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "categorias");
        echo json_encode($json);
    }

    function marcas() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "marcas");
        echo json_encode($json);
    }

    function favs() {
        $matricula=$_POST['mat'];
        $user=$_POST['user'];
        $op=$_POST['oper'];

        $array = array();
        array_push($array, $matricula);
        array_push($array, $user);
        array_push($array, $op);

        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "favs", $array);
        echo json_encode($json);
    }

    function liked() {
        $user=$_POST['user'];
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "liked", $user);
        echo json_encode($json);
    }

}

?>