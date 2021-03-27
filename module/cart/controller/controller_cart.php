<?php 

    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . '/module/cart/model/DAOcart.php');

    switch($_GET['op']) {
        
        case 'list':
            include("module/cart/view/cart.html");
            break;

    }

?>