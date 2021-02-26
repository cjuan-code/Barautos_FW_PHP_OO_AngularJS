<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");

    class DAOhome {

        function select_all_cats() {
            $sql = "SELECT * FROM categories";
            
            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);

            // $retr_array = array();

            // if (mysqli_num_rows($res) > 0) {
            //     while ($row = mysqli_fetch_assoc($res)) {
            //         $retr_array[] = $row;
            //     }
            // }
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