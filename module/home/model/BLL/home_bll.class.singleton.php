<?php 

include('module/home/model/DAO/home_dao.class.singleton.php');

class home_bll {
    private $dao;
    // private $db;
    static $_instance;

    private function __construct() {
        $this->dao = home_dao::getInstance();
        // $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function load_cats_BLL($con) {
        return $this->dao->select_cats($con);
    }

    public function load_carousel_BLL() {
        return $this->dao->select_carousel();
    }
}

?>