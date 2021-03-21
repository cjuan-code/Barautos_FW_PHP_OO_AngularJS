<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");

    class DAOlogin {
        function insert_user($username, $email, $pass, $avatar) {
            $sql = "INSERT INTO user ". "VALUES ('$username', '$email', '$pass', '$avatar')"; 

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_user($username) {
            $sql = "SELECT * FROM user WHERE username='$username'";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql)->fetch_object();
            connect::close($connexion);
            return $res;
        }

        function select_email() {
            $sql = "SELECT email FROM user";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }
    }

?>