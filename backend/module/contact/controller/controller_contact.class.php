<?php

// include(UTILS_PATH . 'common.inc.php');

class controller_contact {

    function sendEmail() {
        $name = $_POST['name'];
        $email = $_POST['mail'];
        $content = $_POST['content'];

        $info_support = ['type' => 'toSupport', 'username' => $name, 'email' => $email, 'content' => $content];
        $info_client = ['type' => 'toClient', 'username' => $name, 'email' => $email];

        $response_support = json_decode(mail::buildEmail($info_support), true);
        
        if (!empty($response_support['id'])) {

            $response_client = json_decode(mail::buildEmail($info_client), true);
            if (!empty($response_client['id'])) {
                echo 1;
            } else {
                echo 0;
            }
        }
      
    }
}

?>