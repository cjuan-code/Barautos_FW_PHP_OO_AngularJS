<?php 

class cart_dao {

    static $_instance;

    private function __construct() {
    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function select_cars($con) {

        $consulta = str_replace("/", " ", $con);
        $sql = $consulta;

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);

        if(!empty($res)) {
            $array_cars = array();
            foreach ($res as $row) {
                array_push($array_cars, $row);
            }
        }

        return $array_cars;
    }

    function insert_factura($values) {
        
        $user = $values[0];
        $total = $values[1]; 
        $date = date("Y-m-d");
            
        $sql = "INSERT INTO factura (user, fecha, precio) VALUES ('$user', '$date', '$total')";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        return $res;

    }

    function insert_line($values) {
        $date = date("Y-m-d");

        $sql2 = "SELECT id_factura FROM factura ORDER BY id_factura DESC LIMIT 1";

        $connexion = connect::con();
        $rest = mysqli_query($connexion, $sql2);

        $resultado = $rest->fetch_assoc();

        $fac = $resultado['id_factura'];
        $producto = $values[0];
        $qty = $values[1];
        $precio = $values[2];

        $sql = "INSERT INTO linea_factura (item, qty, precio, id_factura) VALUES ('$producto', '$qty', '$precio', '$fac')";
        
        $res = mysqli_query($connexion, $sql);

        connect::close($connexion);
        return $res;
    }  

    function update_cart($values) {

        $user = $values[1];
        $items = $values[0];

        $sql = "SELECT * FROM cart_user WHERE user='$user'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql)->fetch_object();
        connect::close($connexion);

        if ($res) {
            $sql2 = "UPDATE cart_user SET items='$items' WHERE user='$user'";
        } else {
            $sql2 = "INSERT INTO cart_user (user, items) VALUES ('$user', '$items')";
        }
        
        $connexion = connect::con();
        $res2 = mysqli_query($connexion, $sql2);
        connect::close($connexion);

        return $res2;
    } 



} 



?>