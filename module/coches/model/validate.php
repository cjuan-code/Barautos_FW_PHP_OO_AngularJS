<?php

    function valida_mat($mat) {
        $sql = "SELECT * FROM car WHERE matricula='$mat'";

        $connexion = connect::con();
        $res = mysqli_query($connexion, $sql);
        connect::close($connexion);
        
        if (!$res) {
            return false;
        } else {
            return true; 
        }
    }

    function validate_php() {
        $check = true;
       // $data = 'hola VALIDATE php asd';
        //die('<script>console.log('.json_encode( $data ) .');</script>');

        $matricula = $_POST['matricula'];
        $s_matricula = valida_mat($matricula);

        if (!$s_matricula) {
            $e_matricula = " ";
        } else {
            $e_matricula = "El coche ya existe.";
            $check = false;
        }

        return $check;
    }
?>