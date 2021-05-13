<?php 

class shop_dao {
    static $_instance;

    private function __construct() {
    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_consulta($con) {
        $sql = str_replace("/", " ", $con);

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);

        if (!empty($res)) {
            $arr_cars = array();
            foreach ($res as $row) {
                array_push($arr_cars, $row);
            }
        }

        return $arr_cars;
    }

    public function select_car($matricula) {
        $sql = "SELECT * FROM vehicles WHERE matricula='$matricula'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql)->fetch_object();
        connect::close($connexion);
        return $res;
    }

    public function select_img($matricula) {
        $sql = "SELECT img FROM img WHERE matricula='$matricula'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);

        if(!empty($res)) {
            $array_img = array();
            foreach ($res as $row) {
                array_push($array_img, $row);
            }
        }
        
        return $array_img;
    }

    public function update_views($matricula) {
        $sql = "UPDATE vehicles SET visitas = visitas + 1 WHERE matricula='$matricula'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        return $res;
    }

    function color() {
        $sql = "SELECT DISTINCT(color) FROM vehicles";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);

        if(!empty($res)) {
            $array = array();
            foreach ($res as $row) {
                array_push($array, $row);
            }
        }

        return $array;
    }

    function funcionamiento() {
        $sql = "SELECT DISTINCT(funcionamiento) FROM vehicles";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        
        if(!empty($res)) {
            $array = array();
            foreach ($res as $row) {
                array_push($array, $row);
            }
        }

        return $array;
    }


    function manejo() {
        $sql = "SELECT DISTINCT(manejo) FROM vehicles";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        
        if(!empty($res)) {
            $array = array();
            foreach ($res as $row) {
                array_push($array, $row);
            }
        }

        return $array;
    }

    function gps() {
        $sql = "SELECT DISTINCT(gps) FROM vehicles";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        
        if(!empty($res)) {
            $array = array();
            foreach ($res as $row) {
                array_push($array, $row);
            }
        }

        return $array;
    }
    
    function wifi() {
        $sql = "SELECT DISTINCT(wifi) FROM vehicles";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        
        if(!empty($res)) {
            $array = array();
            foreach ($res as $row) {
                array_push($array, $row);
            }
        }

        return $array;
    }

    function asientos() {
        $sql = "SELECT DISTINCT(n_asientos) FROM vehicles";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        
        if(!empty($res)) {
            $array = array();
            foreach ($res as $row) {
                array_push($array, $row);
            }
        }

        return $array;
    }

    function puertas() {
        $sql = "SELECT DISTINCT(n_puertas) FROM vehicles";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        
        if(!empty($res)) {
            $array = array();
            foreach ($res as $row) {
                array_push($array, $row);
            }
        }

        return $array;
    }

    function categorias() {
        $sql = "SELECT DISTINCT(c.cod), c.categoria FROM vehicles v INNER JOIN categories c ON v.categoria=c.cod";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        
        if(!empty($res)) {
            $array = array();
            foreach ($res as $row) {
                array_push($array, $row);
            }
        }

        return $array;
    }

    function marcas() {
        $sql = "SELECT DISTINCT(marca) FROM vehicles";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        
        if(!empty($res)) {
            $array = array();
            foreach ($res as $row) {
                array_push($array, $row);
            }
        }

        return $array;
    }

    public function like($array) {

        $matricula=$array[0];
        $user=$array[1];
        $op=$array[2];

        if ($op==='like') {
            $sql = "INSERT INTO favs VALUES('$matricula', '$user')";
        } elseif ($op==='unlike') {
            $sql = "DELETE FROM favs WHERE matricula = '$matricula' AND username = '$user'";
        }

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        return $res;
    }

    public function liked($username) {
        $sql = "SELECT * FROM favs WHERE username = '$username'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);

        if(!empty($res)) {
            $array_liked = array();
            foreach ($res as $row) {
                array_push($array_liked, $row);
            }
        }

        return $array_liked;
    }
    
}

?>