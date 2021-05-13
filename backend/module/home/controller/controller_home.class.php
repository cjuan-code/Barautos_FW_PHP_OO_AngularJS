<?php

class controller_home {
    function list() {
        common::loadView('lib.php', VIEW_PATH_HOME . 'homepage.html');
    }

    function load_cats() {
        $json = common::loadModel(MODEL_PATH_HOME, "home_model", "load_cats");
        echo json_encode($json);
    }

}





?>