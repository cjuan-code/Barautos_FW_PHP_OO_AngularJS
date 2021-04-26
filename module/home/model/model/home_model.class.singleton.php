<?php 

class home_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = home_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function load_cats($con) {
        return $this->bll->load_cats_BLL($con);
    }

    public function load_carousel() {
        return $this->bll->load_carousel_BLL();
    }
}

?>