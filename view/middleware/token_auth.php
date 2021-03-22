<?php

    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . '/view/classes/JWT.php');

    function encode_token($username) {
        ////////////////////////////////////////////////
        //https://github.com/miguelangel-nubla/JWT-PHP//
        ////////////////////////////////////////////////

        // require_once ''.$path.'"/view/classes/JWT.php"';
        $header = '{"typ":"JWT", "alg":"HS256"}';
        $secret = 'maytheforcebewithyou';

        //iat: Tiempo que inició el token
        //exp: Tiempo que expirará el token (+1 hora)
        //name: info user
        $payload = '{
            "iat":time(), 
            "exp":time() + (60*60),
            "name":"'.$username.'"
        }';

        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);

        return $token;
    }

    function decode_token($token) {
        $secret = 'maytheforcebewithyou';
    
        $JWT = new JWT;
        $json = $JWT->decode($token, $secret);

        return $json;
    }
?>