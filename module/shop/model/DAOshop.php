<?php 
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");

    class DAOshop {

        function select_all_items() {
            $sql = "SELECT v.*, i.img FROM vehicles v INNER JOIN img i ON v.matricula=i.matricula WHERE i.img LIKE ('%1.jpg') ORDER BY visitas DESC";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);

            return $res;
        }
        
        function select_nuevos() {
            $sql = "SELECT v.*, i.img FROM vehicles v INNER JOIN img i ON v.matricula=i.matricula WHERE i.img LIKE ('%1.jpg') AND v.categoria = (SELECT cod FROM categories WHERE categoria = 'Nuevos') ORDER BY visitas DESC";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);

            return $res;
        }

        function select_km0() {
            $sql = "SELECT v.*, i.img FROM vehicles v INNER JOIN img i ON v.matricula=i.matricula WHERE i.img LIKE ('%1.jpg') AND v.categoria = (SELECT cod FROM categories WHERE categoria = 'KM0') ORDER BY visitas DESC";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);

            return $res;

        }

        function select_segunda_mano() {
            $sql = "SELECT v.*, i.img FROM vehicles v INNER JOIN img i ON v.matricula=i.matricula WHERE i.img LIKE ('%1.jpg') AND v.categoria = (SELECT cod FROM categories WHERE categoria = 'Segunda Mano') ORDER BY visitas DESC";

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);

            return $res;

        }

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

        function select_filters($consulta) {
            $sql = $consulta;

            $connexion = connect::con();
            $res = mysqli_query($connexion, $sql);
            connect::close($connexion);
            return $res;

        }

    }
?>