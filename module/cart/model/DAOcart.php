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
    }
?>