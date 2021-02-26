<?php
    $path = $_SERVER['DOCUMENT_ROOT'];

    include($path . "/model/connect.php");

    class DAOcar {
        
        function insert_car($datos) {
            $matricula = $datos['matricula'];
            $f_ini = $datos['f_ini'];
            $f_fin = $datos['f_fin'];
            $color = $datos['color'];
            $marca = $datos['marca'];
            $gps = $datos['gps'];
            $wifi = $datos['wifi'];
            $km = $datos['km'];

            $sql = " INSERT INTO car (matricula, f_ini, f_fin, color, marca, gps, wifi, km)"." VALUES ('$matricula', '$f_ini', '$f_fin', '$color', '$marca', '$gps', '$wifi', '$km')";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_all_cars() {
            $sql = "SELECT * FROM car ORDER BY matricula ASC";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_car($matricula) {
            $sql = "SELECT * FROM car WHERE matricula='$matricula'";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql)->fetch_object();
            connect::close($connexion);
            return $res;
        }

        function update_car($datos) {
            $matricula = $datos['matricula'];
            $f_ini = $datos['f_ini'];
            $f_fin = $datos['f_fin'];
            $color = $datos['color'];
            $marca = $datos['marca'];
            $gps = $datos['gps'];
            $wifi = $datos['wifi'];
            $km = $datos['km'];

            $sql = " UPDATE car SET f_ini='$f_ini', f_fin='$f_fin', color='$color', marca='$marca', gps='$gps', wifi='$wifi', km='$km' WHERE matricula='$matricula'";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function delete_car($matricula) {
            $sql = "DELETE FROM car WHERE matricula='$matricula'";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }


    }

?>