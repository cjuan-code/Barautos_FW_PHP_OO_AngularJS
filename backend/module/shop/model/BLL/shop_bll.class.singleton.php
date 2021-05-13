<?php 

class shop_bll {
    private $dao;
    // private $db;
    static $_instance;

    private function __construct() {
        $this->dao = shop_dao::getInstance();
        // $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function print_cars_BLL($con) {
        return $this->dao->select_consulta($con);
    }

    public function details_car_BLL($matricula) {
        return $this->dao->select_car($matricula);
    }

    public function details_img_BLL($matricula) {
        return $this->dao->select_img($matricula);
    }
    
    public function update_views_BLL($matricula) {
        return $this->dao->update_views($matricula);
    }

    public function color_BLL() {
        return $this->dao->color();
    }

    public function funcionamiento_BLL() {
        return $this->dao->funcionamiento();
    }

    public function manejo_BLL() {
        return $this->dao->manejo();
    }

    public function gps_BLL() {
        return $this->dao->gps();
    }

    public function wifi_BLL() {
        return $this->dao->wifi();
    }

    public function asientos_BLL() {
        return $this->dao->asientos();
    }

    public function puertas_BLL() {
        return $this->dao->puertas();
    }

    public function categorias_BLL() {
        return $this->dao->categorias();
    }

    public function marcas_BLL() {
        return $this->dao->marcas();
    }

    public function favs_BLL($array) {
        return $this->dao->like($array);
    }

    public function liked_BLL($user) {
        return $this->dao->liked($user);
    }
}

?>