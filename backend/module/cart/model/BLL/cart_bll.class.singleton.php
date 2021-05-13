<?php 

class cart_bll {

    private $dao;
    // private $db;
    static $_instance;

    private function __construct() {
        $this->dao = cart_dao::getInstance();
        // $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function cars_BLL($con) {
        return $this->dao->select_cars($con);
    }
    
    function factura_BLL($values) {
        return $this->dao->insert_factura($values);
    }

    function line_BLL($values) {
        return $this->dao->insert_line($values);
    }

    function update_cart_BLL($values) {
        return $this->dao->update_cart($values);
    }

} 

?>