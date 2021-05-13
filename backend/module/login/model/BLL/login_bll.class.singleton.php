<?php 

class login_bll {
    private $dao;
    static $_instance;

    private function __construct() {
        $this->dao = login_dao::getInstance();
        // $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function search_user_BLL($username) {
        return $this->dao->search_user($username);
    }

    function email_validation_BLL() {
        return $this->dao->email_validation();
    }

    function register_BLL($values) {
        return $this->dao->register($values);
    }

    function login_BLL($username) {
        return $this->dao->search_user($username);
    }

    function search_user_cart_BLL($username) {
        return $this->dao->search_user_cart($username);
    }

    function activate_BLL($token) {
        return $this->dao->activate_user($token);
    }

    function recover_password_BLL($values) {
        return $this->dao->recover_password($values);
    }

    function social_login_BLL($values) {
        return $this->dao->social_login($values);
    }
}

?>