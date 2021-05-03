<?php 

class cart_model {

    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = cart_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function cars($con) {
        return $this->bll->cars_BLL($con);
    }

    function factura($values) {
        return $this->bll->factura_BLL($values);
    }

    function line($values) {
        return $this->bll->line_BLL($values);
    }

    function update_cart($values) {
        return $this->bll->update_cart_BLL($values);
    } 

}


?>