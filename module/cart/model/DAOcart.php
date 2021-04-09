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

        function insert_factura($user, $total) {

            $date = date("Y-m-d");
            
            $sql = "INSERT INTO factura (user, fecha, precio) VALUES ('$user', '$date', '$total')";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;            

        }

        function insert_linea($producto, $qty, $precio) {

            $date = date("Y-m-d");

            $sql2 = "SELECT id_factura FROM factura ORDER BY id_factura DESC LIMIT 1";

            $connexion = connect::con();
            $rest = mysqli_query($connexion, $sql2);

            $resultado = $rest->fetch_assoc();

            $fac = $resultado['id_factura'];

            $sql = "INSERT INTO linea_factura (item, qty, precio, id_factura) VALUES ('$producto', '$qty', '$precio', '$fac')";
            
            $res = mysqli_query($connexion, $sql);

            connect::close($connexion);
            return $res;
        }
    }
?>