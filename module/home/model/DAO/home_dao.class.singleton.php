<?php 

class home_dao {
    static $_instance;

    private function __construct() {
    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_cats($con) {
        $sql = str_replace("/", " ", $con);

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);

        if (!empty($res)) {
            $arr_cat = array();
            foreach ($res as $row) {
                array_push($arr_cat, $row);
            }
        }

        return $arr_cat;
    }

    public function select_carousel() {
        $sql = "SELECT * FROM categories LIMIT 2";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);

        if(!empty($res)) {
            $arr_cat_carousel = array();
            foreach ($res as $row) {
                array_push($arr_cat_carousel, $row);
            }
        }

        return $arr_cat_carousel;
    }
    
}

?>