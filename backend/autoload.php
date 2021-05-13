<?php 

/* require ('paths.php');

// spl_autoload_register(null, false);
spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php');
spl_autoload_register('loadClasses');

function loadClasses($className) {
    
    // $className = "home_bll";
    $breakClass = explode('_', $className);
    $modelName = "";

    if (isset($breakClass[1])) {
        $modelName = strtoupper($breakClass[1]);
    }// end_if
    
    // print(SITE_ROOT . 'module/' . $breakClass[0] . '/model/'. $modelName . '/' . $className . '.class.singleton.php');

    if (file_exists(SITE_ROOT . 'module/' . $breakClass[0] . '/model/'. $modelName . '/' . $className . '.class.singleton.php')) {
        // print(SITE_ROOT . 'module/' . $breakClass[0] . '/model/'. $modelName . '/' . $className . '.class.singleton.php');
        set_include_path('module/' . $breakClass[0] . '/model/' . $modelName.'/');


        // ini_set('include_path', 'module/' . $breakClass[0] . '/model/' . $modelName.'/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'model/' . $className . '.class.singleton.php')){
        // print(SITE_ROOT . 'model/' . $className . '.class.singleton.php');
        set_include_path(SITE_ROOT . 'model/');
    
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'model/' . $className . '.class.php')){
        // print(SITE_ROOT . 'model/' . $className . '.class.php');

        set_include_path(SITE_ROOT . 'model/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'utils/' . $className . '.inc.php')) {
        // print(SITE_ROOT . 'utils/' . $className);
        set_include_path(SITE_ROOT . 'utils/');


        // ini_set('include_path', SITE_ROOT . 'utils/');
        spl_autoload($className);
    }// end_else
}// end_loadClasses */
















//////
require ('paths.php');
//////
// spl_autoload_register(null, false);
spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php');
spl_autoload_register('loadClasses');
//////
function loadClasses($className) {
    $breakClass = explode('_', $className);
    $modelName = "";
    //////
    if (isset($breakClass[1])) {
        $modelName = strtoupper($breakClass[1]);
    }// end_if
    //////
    if (file_exists(SITE_ROOT . 'module/' . $breakClass[0] . '/model/'. $modelName . '/' . $className . '.class.singleton.php')) {
        set_include_path('module/' . $breakClass[0] . '/model/' . $modelName.'/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'model/' . $className . '.class.singleton.php')){
        set_include_path(SITE_ROOT . 'model/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'model/' . $className . '.class.php')){
        set_include_path(SITE_ROOT . 'model/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'utils/' . $className . '.inc.php')) {
        set_include_path(SITE_ROOT . 'utils/');
        spl_autoload($className);
    //}else if (file_exists(SITE_ROOT . 'model/' . $className . '.php')) {
    //     set_include_path(SITE_ROOT . 'model/');
    //     spl_autoload($className);
    }// end_else
}// end_loadClasses

?>