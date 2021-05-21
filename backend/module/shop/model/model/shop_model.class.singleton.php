<?php 

class shop_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = shop_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_con($con) {
        return $this->bll->select_con_BLL($con);
    }

    public function details_car($matricula) {
        return $this->bll->details_car_BLL($matricula);
    }

    public function details_img($matricula) {
        return $this->bll->details_img_BLL($matricula);
    }

    public function update_views($matricula) {
        return $this->bll->update_views_BLL($matricula);
    }

    public function color() {
        return $this->bll->color_BLL();
    }

    public function funcionamiento() {
        return $this->bll->funcionamiento_BLL();
    }

    public function manejo() {
        return $this->bll->manejo_BLL();
    }

    public function gps() {
        return $this->bll->gps_BLL();
    }

    public function wifi() {
        return $this->bll->wifi_BLL();
    }

    public function asientos() {
        return $this->bll->asientos_BLL();
    }

    public function puertas() {
        return $this->bll->puertas_BLL();
    }

    public function categorias() {
        return $this->bll->categorias_BLL();
    }

    public function marcas() {
        return $this->bll->marcas_BLL();
    }

    public function favs($array) {
        return $this->bll->favs_BLL($array);
    }

    public function liked($user) {
        return $this->bll->liked_BLL($user);
    }

}

?>