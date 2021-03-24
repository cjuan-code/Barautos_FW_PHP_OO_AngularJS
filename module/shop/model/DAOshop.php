<?php 
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");

    class DAOshop {

        function select_car($matricula) {
            $sql = "SELECT * FROM vehicles WHERE matricula='$matricula'";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql)->fetch_object();
            connect::close($connexion);
            return $res;
        }

        function select_img($matricula) {
            $sql = "SELECT img FROM img WHERE matricula='$matricula'";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function update_views($matricula) {
            $sql = "UPDATE vehicles SET visitas = visitas + 1 WHERE matricula='$matricula'";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        
        function select_color() {
            $sql = "SELECT DISTINCT(color) FROM vehicles";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_funcionamiento() {
            $sql = "SELECT DISTINCT(funcionamiento) FROM vehicles";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }


        function select_manejo() {
            $sql = "SELECT DISTINCT(manejo) FROM vehicles";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_gps() {
            $sql = "SELECT DISTINCT(gps) FROM vehicles";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }
        
        function select_wifi() {
            $sql = "SELECT DISTINCT(wifi) FROM vehicles";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_asientos() {
            $sql = "SELECT DISTINCT(n_asientos) FROM vehicles";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_puertas() {
            $sql = "SELECT DISTINCT(n_puertas) FROM vehicles";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_categorias() {
            $sql = "SELECT DISTINCT(c.cod), c.categoria FROM vehicles v INNER JOIN categories c ON v.categoria=c.cod";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_marcas() {
            $sql = "SELECT DISTINCT(marca) FROM vehicles";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function select_consulta($consulta) {
            $sql = $consulta;

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;

        }

        function like($matricula, $user, $op) {

            if ($op==='like') {
                $sql = "INSERT INTO favs VALUES('$matricula', '$user')";
            } elseif ($op==='unlike') {
                $sql = "DELETE FROM favs WHERE matricula = '$matricula' AND username = '$user'";
            }

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

        function liked($username) {
            $sql = "SELECT * FROM favs WHERE username = '$username'";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;
        }

    }
?>