<?php

    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . '/module/login/model/DAOlogin.php');

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

            $res = $daologin->select_user($username);

            if ($res) {
                echo "user exists";

            } else {

                // email validation 

                $res_email = $daologin->select_email();
                
                if(!empty($res_email)) {

                    $array_email = array();

                    foreach ($res_email as $row) {
                        array_push($array_email, $row['email']);
                    }
                    
                }

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

                
                
            }

            break;
    }
?>