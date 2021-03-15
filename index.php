<?php 
    if ((isset($_GET['page'])) && ($_GET['page']==="controller_cars") ){
        include("view/inc/lib_coches.php");
    } else if ((isset($_GET['page'])) && ($_GET['page']==="controller_shop") ) {
        include("view/inc/lib_shop.php");
    } else if ((isset($_GET['page'])) && ($_GET['page']==="controller_login")) {
        include("view/inc/lib_login.php");
    }else{
        include("view/inc/lib.php");
    }

?>

<div id="space">

    <div id="menu">
        <?php include("view/inc/menu.html"); ?>
    </div>

    <div id="content">
        <?php include("view/inc/pages.php"); ?>
    </div>
    
    <br><br><br>
    <div id="footer">
    </div>
</div>
