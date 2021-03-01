<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . '/module/home/model/DAOhome.php');


    if(!isset($_GET['op'])) {
        include('module/home/view/homepage.html');
    } else {
        switch($_GET['op']) {
            case 'load_cats':

                $con_ = $_GET['con'];
                $consulta = str_replace("/", " ", $con_);

                $daohome = new DAOhome();
                $res = $daohome->select_all_cats($consulta);

                if (!empty($res)) {
                    $arr_cat = array();
                    foreach ($res as $row) {
                        array_push($arr_cat, $row);
                    }
                    echo json_encode($arr_cat);
                    
                } else {
                    echo json_encode("error");
                }
              break;
            case 'load_carousel':
                $daohome = new DAOhome();
                $res = $daohome->select_cat_carousel();

                if(!empty($res)) {
                    $arr_cat_carousel = array();
                    foreach ($res as $row) {
                        array_push($arr_cat_carousel, $row);
                    }
                    echo json_encode($arr_cat_carousel);
                    
                } else {
                    echo json_encode("error");
                }
                break;

        }
    }
?>