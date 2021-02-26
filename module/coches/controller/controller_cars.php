<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/module/coches/model/DAOcar.php");

    switch($_GET['op']) {
        case 'list':
            $daocar = new DAOcar();
            $res = $daocar->select_all_cars();

            if (!$res) {
                die('<script>alert("LIST!!!!!!!");</script>');
            } else {
                include("module/coches/view/list_car.php");
            }
            break;

        case 'create':
            include("module/coches/model/validate.php");

            $check = true;

            if ($_POST) {

              //  $data = 'hola create post asd';
                //die('<script>console.log('.json_encode( $data ) .');</script>');
                $check = validate_php();

                if ($check) {
                    $_SESSION['car']=$_POST;

                    $daocar = new DAOcar();
                    $res = $daocar->insert_car($_POST);
                    
                    if ($res) {
                        echo '<script language="javascript">alert("Registrado en la base de datos correctamente")</script>';
            			$callback = 'index.php?page=controller_cars&op=list';
        			    die('<script>window.location.href="'.$callback .'";</script>');
                    } else {
                        $callback = 'index.php?page=503';
    			        die('<script>window.location.href="'.$callback .'";</script>');
                    }
                }
            }
            include("module/coches/view/create_car.php");
            break;

        case 'update':
            include("module/coches/model/validate.php");
            
            $check = true;
            
            if ($_POST){
                $check=validate_php();
                
                if ($check){
                    $_SESSION['car']=$_POST;

                    $daocar = new DAOcar();
    		        $res = $daocar->update_car($_POST);
                    
		            if($res){
            			//echo '<script language="javascript">alert("Actualizado en la base de datos correctamente")</script>';
            			$callback = 'index.php?page=controller_cars&op=list';
        			    die('<script>window.location.href="'.$callback .'";</script>');
            		}else{
            			$callback = 'index.php?page=503';
    			        die('<script>window.location.href="'.$callback .'";</script>');
            		}
                }
            }
            
            try{
                $daocar = new DAOcar();
            	$res = $daocar->select_car($_GET['id']);
            	$car=get_object_vars($res);
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$res){
    			$callback = 'index.php?page=503';
    			die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
        	    include("module/coches/view/update_car.php");
    		}
            break;
            
        case 'read':
            // $daocar = new DAOcar();
            // $res = $daocar->select_car($_GET['id']);
            // $car_show=get_object_vars($res);

            // if (!$res) {
            //     die('<script>alert("READ!!!!!!!")</script>');
            // } else {
            //     include("module/coches/view/read_car.php");
            // }
            // break; 
            $daocar = new DAOcar();
            $res = $daocar->select_car($_GET['id']);

            if(!$res) {
                echo json_encode("error");
                exit;
            } else {
                $car_show = get_object_vars($res);
                echo json_encode($car_show);
                exit;
            }

            break;
        case 'delete':
            if ($_POST) {

                $daocar = new DAOcar();
                $res = $daocar->delete_car($_GET['id']);

                if ($res) {
                    echo '<script language="javascript">alert("Se ha borrado el coche correctamente.")';
                    $callback = 'index.php?page=controller_cars&op=list';
                    die('<script>window.location.href="'.$callback.'";</script>');
                } else {
                    echo '<script language="javascript">alert("Error");</script>';
                }
            }

            include("module/coches/view/delete_car.php");
            break;

        default:
            include("view/inc/404.html");
            break;
    }
?>
