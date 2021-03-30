<?php 

    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");

    class DAOcart {
        function select_consulta($consulta) {
            $sql = $consulta;

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;

        }

        function insert_cart($user, $prods) {
            $sql = "INSERT INTO cart_user VALUES ('$user', '$prods')";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function delete_cart($user) {
            $sql = "DELETE FROM cart_user WHERE user='$user'";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }


        // function isnert_linea($producto, $qty, $precio) {
        //     $sql = "INSERT INTO linea_factura VALUES (SELECT (max(id_linea)+1) FROM linea_factura, '$matricula', '$qty', '$precio', )";

        //     $connexion = connect::con();
        //     $res = mysqli_query($connexion, $sql);
        //     connect::close($connexion);
        //     return $res;
        // }
    }
?>