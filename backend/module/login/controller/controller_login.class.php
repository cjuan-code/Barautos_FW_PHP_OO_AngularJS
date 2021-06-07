<?php

    class controller_login {

        function list() {
            common::loadView('lib_login.php', VIEW_PATH_LOGIN . 'login-register.html');
        }

        function register() {

            $username = $_POST['name'];
            $pass = $_POST['password'];
            $email = $_POST['mail'];

            $token = jwt_func::encode_token($username);

            $hash_pass = password_hash($pass, PASSWORD_DEFAULT);
            $hash_email = password_hash($email, PASSWORD_DEFAULT);
            $hashavatar= md5( strtolower( trim( "$email" ) ) );
            $avatar="https://www.gravatar.com/avatar/$hashavatar?s=40&d=identicon";


            $res = common::loadModel(MODEL_PATH_LOGIN, "login_model", "search_user", $username);

            $resultado = $res->fetch_assoc();

            if ($resultado) {
                echo 3;
                // echo json_encode("user_exists");
            } else {

                // email validation 
                $res_email = common::loadModel(MODEL_PATH_LOGIN, "login_model", "email_validation");

                if ($res_email) {

                    $array_email = array();

                    foreach ($res_email as $row) {
                        array_push($array_email, $row['email']);
                    }
                

                    if (count($array_email)>0) {

                        $array_verify = array();

                        for ($i = 0; $i <= (count($array_email)-1); $i++) {

                            $verify_email = password_verify($email, $array_email[$i]);
                            array_push($array_verify, $verify_email);

                        } // end for
                            
                        $exists = in_array(true, $array_verify);

                        if ($exists) {
                            echo 2;
                            // echo json_encode("email used");
                            exit();
                        } else {

                            $array_reg = array();

                            array_push($array_reg, $username);
                            array_push($array_reg, $hash_email);
                            array_push($array_reg, $hash_pass);
                            array_push($array_reg, $avatar);
                            array_push($array_reg, $token);

                            $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "register", $array_reg);
                            
                            if ($json) {

                                $activate_info = ['type' => 'activate', 'username' => $username, 'email' => $email, 'tk' => $token];

                                $response_client = json_decode(mail::buildEmail($activate_info), true);

                                echo 1;
                                // echo json_encode("user registered");
                                exit();
                            } else {
                                echo 0;
                                // echo json_encode("user not registered");
                                exit();
                            } // end else insert
                        } // end else verify email
                    }
                    
                } else {

                    $array_reg = array();

                    array_push($array_reg, $username);
                    array_push($array_reg, $hash_email);
                    array_push($array_reg, $hash_pass);
                    array_push($array_reg, $avatar);
                    array_push($array_reg, $token);
        
                    $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "register", $array_reg);
                    
                    if ($json) {

                        $activate_info = ['type' => 'activate', 'username' => $username, 'email' => $email, 'tk' => $token];

                        $response_client = json_decode(mail::buildEmail($activate_info), true);

                        echo 1;
                        // echo json_encode("user registered");
                        exit();
                    } else {
                        echo 0;
                        // echo json_encode("user not registered");
                        exit();
                    }
                }// end else if res email

        
            }
        }

        function login() {
            $username = $_POST['user'];
            $pass = $_POST['password'];

            $res = common::loadModel(MODEL_PATH_LOGIN, "login_model", "login", $username);

            $resultado = $res->fetch_assoc();

            if ($resultado) {

                $activated = $resultado['activate'];

                if ($activated==='0') {
                    // echo ("user not activated");
                    echo 0;
                } else {
                    $pass_db = $resultado['pass'];
                
                    $verify_pass = password_verify($pass, $pass_db);
    
                    if ($verify_pass) {
                        $token = jwt_func::encode_token($username);
                        echo $token;
                    } else {
                        // echo ("pass dont match");
                        echo 1;
                    }
                }
            } else {
                // echo ("user not exists");
                echo 2;
            }

        }

        function menu() {
            $tk = $_POST['tk'];

            $token = jwt_func::decode_token($tk);

            $username = substr($token, 86, -12);
            
            $res = common::loadModel(MODEL_PATH_LOGIN, "login_model", "search_user_cart", $username);

            echo json_encode($res);
        }

        function time() {
            $tk = $_POST['tk'];
            $token = jwt_func::decode_token($tk);
            echo $token;
        }

        function activate() {

            $tk = $_POST['tk'];
            $res = common::loadModel(MODEL_PATH_LOGIN, "login_model", "activate", $tk);

            if ($res) {
                echo 1;
            } else {
                echo 0;
            }
            // header('Location: '.SITE_PATH . '#/login');
        }

        function recover_password() {

            $token = $_POST['tk'];
            $pass = $_POST['password'];
            $hash_pass = password_hash($pass, PASSWORD_DEFAULT);

            $values = array();

            array_push($values, $token);
            array_push($values, $hash_pass);

            $res = common::loadModel(MODEL_PATH_LOGIN, "login_model", "recover_password", $values);

            if ($res) {
                echo 1;
            } else {
                echo 2;
            }

        }

        function send_mail_recover() {
            $email = $_POST['email'];

            $res_email = common::loadModel(MODEL_PATH_LOGIN, "login_model", "email_validation");

            if ($res_email) {

                foreach ($res_email as $row) {
                    
                    $verify_email = password_verify($email, $row['email']);
                    
                    if ($verify_email) {
                        $token = $row['token_mail'];
                    }
                }

            }

            $recover_info = ['type' => 'recover', 'email' => $email, 'token' => $token];

            $response_client = json_decode(mail::buildEmail($recover_info), true);

            if (!empty($response_client['id'])) {
                echo 1;
            } else {
                echo 0;
            }
        }

        function social_login() {
            $token = $_POST['id'];
            $username = $_POST['user'];
            $mail = $_POST['mail'];
            $photo = $_POST['photo'];

            $hash_email = password_hash($mail, PASSWORD_DEFAULT);

            $values = array();

            array_push($values, $token);
            array_push($values, $username);
            array_push($values, $hash_email);
            array_push($values, $photo);

            $res = common::loadModel(MODEL_PATH_LOGIN, "login_model", "social_login", $values);
            
            echo json_encode($res);
        }

    }


?>