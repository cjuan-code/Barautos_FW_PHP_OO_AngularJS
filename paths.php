<?php 

define ('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . '/');
define ('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . '/');
define ('VIEW_PATH_INC', SITE_ROOT . 'view/inc/');
define ('VIEW_PATH_CSS', SITE_ROOT . 'view/css/');
define ('MODEL_PATH', SITE_ROOT . 'model/');
define ('MODULES_PATH', SITE_ROOT . 'module/');
define ('UTILS_PATH', SITE_ROOT . 'utils/');

define ('MODEL_PATH_CONTACT', SITE_ROOT . 'module/contact/model/');
define ('VIEW_PATH_CONTACT', SITE_ROOT . 'module/contact/view/');

define ('MODEL_PATH_HOME', SITE_ROOT . 'module/home/model/model/');
define ('VIEW_PATH_HOME', SITE_ROOT . 'module/home/view/');

define ('MODEL_PATH_SHOP', SITE_ROOT . 'module/shop/model/model/');
define ('VIEW_PATH_SHOP', SITE_ROOT . 'module/shop/view/');

define ('MODEL_PATH_LOGIN', SITE_ROOT . 'module/login/model/model/');
define ('VIEW_PATH_LOGIN', SITE_ROOT . 'module/login/view/');

define ('MODEL_PATH_CART', SITE_ROOT . 'module/cart/model/model/');
define ('VIEW_PATH_CART', SITE_ROOT . 'module/cart/view/');


define('URL_FRIENDLY', TRUE);

if ($_GET['op'] == 'get') {
    echo json_encode(URL_FRIENDLY);
}
?>