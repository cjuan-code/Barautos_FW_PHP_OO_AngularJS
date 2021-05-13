<?php 

class login_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = login_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function search_user($username) {
        return $this->bll->search_user_BLL($username);
    }

    function email_validation() {
        return $this->bll->email_validation_BLL();
    }

    function register($values) {
        return $this->bll->register_BLL($values);
    }

    function login($username) {
        return $this->bll->login_BLL($username);
    }

    function search_user_cart($username) {
        return $this->bll->search_user_cart_BLL($username);
    }

    function activate($token) {
        return $this->bll->activate_BLL($token);
    }

    function recover_password($values) {
        return $this->bll->recover_password_BLL($values);
    }

    function social_login($values) {
        return $this->bll->social_login_BLL($values);
    }

}

?>