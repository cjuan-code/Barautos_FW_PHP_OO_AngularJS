<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");

    class DAOhome {

        function select_all_cats($consulta) {
            $sql = $consulta;
            
            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);

            return $res;
        }

        function select_cat_carousel() {
            $sql = "SELECT * FROM categories LIMIT 2";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);

            return $res;
        }

    }
?>