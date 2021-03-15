<?php

	if (!isset($_GET['page'])) {
		include("module/home/controller/controller_home.php");
	} else {

		if ($_GET['page']==='controller_cars') {
			include("module/coches/controller/controller_cars.php");
		}

		if ($_GET['page']==='controller_home') {
			include("module/home/controller/controller_home.php");
		}

		if ($_GET['page']==='controller_shop') {
			include("module/shop/controller/controller_shop.php");
		}

		if ($_GET['page']==='controller_login') {
			include("module/login/controller/controller_login.php");
		}
	}
?>