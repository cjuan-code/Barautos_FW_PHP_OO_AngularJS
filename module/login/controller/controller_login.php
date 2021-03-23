<?php

    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . '/module/login/model/DAOlogin.php');
    include($path . '/view/middleware/token_auth.php');

    switch($_GET['op']) {
            
        case 'list':
            include("module/login/view/login-register.html");
            break;
        
        case 'register':

            $username = $_GET['username_reg'];
            $pass = $_GET['pass'];
            $email = $_GET['email'];

            $hash_pass = password_hash($pass, PASSWORD_DEFAULT);
            $hash_email = password_hash($email, PASSWORD_DEFAULT);
            $hashavatar= md5( strtolower( trim( "$email" ) ) );
            $avatar="https://www.gravatar.com/avatar/$hashavatar?s=40&d=identicon";
            
            $daologin = new DAOlogin();

            $res = $daologin->select_user_register($username);

            if ($res) {
                echo "user exists";
            } else {
                // email validation 
                $res_email = $daologin->select_email();

                if($res_email) {

                    $array_email = array();

                    foreach ($res_email as $row) {
                        array_push($array_email, $row['email']);
                    }

                    if (count($array_email)>0) {

                        for ($i = 0; $i <= (count($array_email)-1); $i++) {

                            $verify_email = password_verify($email, $array_email[$i]);
        
                            if ($verify_email) {
                                echo "email used";
                                exit();
                            } else {
                                $res_user = $daologin->insert_user($username, $hash_email, $hash_pass, $avatar);
        
                                if ($res_user) {
                                    echo "user registered";
                                    exit();
                                } else {
                                    echo "user not registered";
                                    exit();
                                } // end else insert
                            } // end else verify email
                        } // end for
                    } else {
                        
                        $res_user = $daologin->insert_user($username, $hash_email, $hash_pass, $avatar);
    
                        if ($res_user) {
                            echo "user registered";
                            exit();
                        } else {
                            echo "user not registered";
                            exit();
                        } // end else insert
                    } // end else if count
                    
                } // end if res          
                
                
            }

            break;

            case 'login':
                $username = $_GET['username_login'];
                $pass = $_GET['pass_login'];

                $daologin = new DAOlogin();
                $res = $daologin->select_user($username);
                $resultado = $res->fetch_assoc();

                // echo json_encode($resultado);

                if ($resultado) {
                    $pass_db = $resultado['pass'];
                    
                    $verify_pass = password_verify($pass, $pass_db);

                    if ($verify_pass) {
                        $token = encode_token($username);
                        echo $token;
                    } else {
                        echo "pass dont match";
                    }
                } else {
                    echo "user not exists";
                }

                break;

            case 'menu':
                
                $tk = $_GET['tk'];

                $token = decode_token($tk);

                $username = substr($token, 86, -12);
                
                $daologin = new DAOlogin();
                $res = $daologin->select_user_register($username);

                echo json_encode($res);
                break;

            case 'time':

                $tk = $_GET['tk'];

                $token = decode_token($tk);

                echo $token;
                break;
    }
?>