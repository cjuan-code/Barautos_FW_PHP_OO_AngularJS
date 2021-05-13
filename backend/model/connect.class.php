<?php 
    class connect {
        public static function con() {
            $host = 'localhost';
            $user = "root";
            $pass = "";
            $db = "crud_cars";
            $port = 3306;
            

            $conexion = mysqli_connect($host, $user, $pass, $db);
            return $conexion;
        }

        public static function close($conexion) {
            $conexion->close();
        }

    }
?>