<?php

class login_dao {
    static $_instance;

    private function __construct() {
    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    function search_user($username) {
        $sql = "SELECT * FROM users WHERE username='$username'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        return $res;
    }

    function email_validation() {
        $sql = "SELECT * FROM users";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);

        if(!empty($res)) {
            $array_email = array();
            foreach ($res as $row) {
                array_push($array_email, $row);
            }
        }

        return $array_email;
    }

    function register($values) {

        $username = $values[0];
        $email = $values[1];
        $pass = $values[2];
        $avatar = $values[3];
        $token = $values[4];

        $id = common::generateRandomString(20);

        $sql = "INSERT INTO users VALUES ('$id', '$username', '$email', '$pass', '$avatar', '0', '$token')";


        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);

        return $res;
    }

    function search_user_cart($username) {
        $sql = "SELECT u.*, c.items FROM users u LEFT JOIN cart_user c ON u.username=c.user WHERE u.username='$username'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql)->fetch_object();
        connect::close($connexion);
        return $res;
    }

    function activate_user($token) {
        $sql = "UPDATE users SET activate=1 WHERE token_mail='$token'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        return $res;
    }

    function recover_password($values) {

        $token = $values[0];
        $password = $values[1];

        $sql = "UPDATE users SET pass='$password' WHERE token_mail='$token'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        return $res;
    }

    function social_login($values) {

        $id = $values[0];
        $username = $values[1];
        $mail = $values[2];
        $photo = $values[3];

        $pass = common::generateRandomString(20);
        $token = common::generateRandomString(20);

        $sql = "SELECT * FROM users WHERE id_user='$id'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql)->fetch_object();

        if ($res) {
            // return $res;
            $jwt_tk = jwt_func::encode_token($username);
            return $jwt_tk;
        } else {
            $sql2 = "INSERT INTO users VALUES ('$id', '$username', '$mail', '$pass', '$photo', '1', '$token')";
            $res2 = mysqli_query($connexion, $sql2);

            // return "mhmhmhm";
            
            $jwt_tk = jwt_func::encode_token($username);
            return $jwt_tk;
        }

        connect::close($connexion);

    }
}
?>