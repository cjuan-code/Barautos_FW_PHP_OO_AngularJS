<?php

class controller_home {
    function list() {
        common::loadView('lib.php', VIEW_PATH_HOME . 'homepage.html');
    }

    function load_cats() {
        $con = $_POST['con'];
        $json = common::loadModel(MODEL_PATH_HOME, "home_model", "load_cats", $con);
        echo json_encode($json);
    }

    function load_carousel() {
        $json = common::loadModel(MODEL_PATH_HOME, "home_model", "load_carousel");
        echo json_encode($json);
    }
}





?>