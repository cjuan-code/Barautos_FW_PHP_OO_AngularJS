<?php

    // $path = $_SERVER['DOCUMENT_ROOT'];
    // include($path . '/module/login/model/DAOlogin.php');
    // include($path . '/view/middleware/token_auth.php');

    // switch($_GET['op']) {
            
    //     case 'list':
    //         include("module/login/view/login-register.html");
    //         break;
        
    //     case 'register':

    //         $username = $_GET['username_reg'];
    //         $pass = $_GET['pass'];
    //         $email = $_GET['email'];

    //         $hash_pass = password_hash($pass, PASSWORD_DEFAULT);
    //         $hash_email = password_hash($email, PASSWORD_DEFAULT);
    //         $hashavatar= md5( strtolower( trim( "$email" ) ) );
    //         $avatar="https://www.gravatar.com/avatar/$hashavatar?s=40&d=identicon";
            
    //         $daologin = new DAOlogin();

    //         $res = $daologin->select_user_register($username);

    //         if ($res) {
    //             echo "user exists";
    //         } else {
    //             // email validation 
    //             $res_email = $daologin->select_email();

    //             if($res_email) {

    //                 $array_email = array();

    //                 foreach ($res_email as $row) {
    //                     array_push($array_email, $row['email']);
    //                 }

    //                 if (count($array_email)>0) {

    //                     for ($i = 0; $i <= (count($array_email)-1); $i++) {

    //                         $verify_email = password_verify($email, $array_email[$i]);
        
    //                         if ($verify_email) {
    //                             echo "email used";
    //                             exit();
    //                         } else {
    //                             $res_user = $daologin->insert_user($username, $hash_email, $hash_pass, $avatar);
        
    //                             if ($res_user) {
    //                                 echo "user registered";
    //                                 exit();
    //                             } else {
    //                                 echo "user not registered";
    //                                 exit();
    //                             } // end else insert
    //                         } // end else verify email
    //                     } // end for
    //                 } else {
                        
    //                     $res_user = $daologin->insert_user($username, $hash_email, $hash_pass, $avatar);
    
    //                     if ($res_user) {
    //                         echo "user registered";
    //                         exit();
    //                     } else {
    //                         echo "user not registered";
    //                         exit();
    //                     } // end else insert
    //                 } // end else if count
                    
    //             } // end if res          
                
                
    //         }

    //         break;

    //         case 'login':
    //             $username = $_GET['username_login'];
    //             $pass = $_GET['pass_login'];

    //             $daologin = new DAOlogin();
    //             $res = $daologin->select_user($username);
    //             $resultado = $res->fetch_assoc();

    //             // echo json_encode($resultado);

    //             if ($resultado) {
    //                 $pass_db = $resultado['pass'];
                    
    //                 $verify_pass = password_verify($pass, $pass_db);

    //                 if ($verify_pass) {
    //                     $token = encode_token($username);
    //                     echo $token;
    //                 } else {
    //                     echo "pass dont match";
    //                 }
    //             } else {
    //                 echo "user not exists";
    //             }

    //             break;

    //         case 'menu':
                
    //             $tk = $_GET['tk'];

    //             $token = decode_token($tk);

    //             $username = substr($token, 86, -12);
                
    //             $daologin = new DAOlogin();
    //             $res = $daologin->select_user_register($username);

    //             echo json_encode($res);
    //             break;

    //         case 'time':

    //             $tk = $_GET['tk'];

    //             $token = decode_token($tk);

    //             echo $token;
    //             break;
    // }


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
                echo json_encode("user_exists");
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
                            echo json_encode("email used");
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

                                echo json_encode("user registered");
                                exit();
                            } else {
                                echo json_encode("user not registered");
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

                        echo json_encode("user registered");
                        exit();
                    } else { 
                        echo json_encode("user not registered");
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
                    echo json_encode("user not activated");
                } else {
                    $pass_db = $resultado['pass'];
                
                    $verify_pass = password_verify($pass, $pass_db);
    
                    if ($verify_pass) {
                        $token = jwt_func::encode_token($username);
                        echo json_encode($token);
                    } else {
                        echo json_encode("pass dont match");
                    }
                }
            } else {
                echo json_encode("user not exists");
            }

        }

        function menu() {
            $tk = $_POST['tk'];

            $token = jwt_func::decode_token($tk);

            $username = substr($token, 86, -12);
            
            $res = common::loadModel(MODEL_PATH_LOGIN, "login_model", "search_user_cart", $username);
            // $daologin = new DAOlogin();

            echo json_encode($res);
        }

        function time() {
            $tk = $_POST['tk'];
            $token = jwt_func::decode_token($tk);
            echo json_encode($token);
        }

        function activate() {

            $tk = $_GET['tk'];
            $res = common::loadModel(MODEL_PATH_LOGIN, "login_model", "activate", $tk);
            header('Location: '.SITE_PATH . 'login/');
        }

        function recover() {
            common::loadView('lib_login.php', VIEW_PATH_LOGIN . 'login-register.html');
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
                echo json_encode('password changed');
            } else {
                echo json_encode('password not changed');
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
                echo json_encode('Done!');
            } else {
                echo json_encode('not done');
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