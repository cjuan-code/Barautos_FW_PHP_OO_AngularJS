CREATE DATABASE crud_cars;
USE crud_cars;

CREATE TABLE IF NOT EXISTS `car` (
    `matricula` VARCHAR(7) COLLATE utf8_spanish_ci NOT NULL,
    `f_ini` VARCHAR(10) COLLATE utf8_spanish_ci NOT NULL,
    `f_fin` VARCHAR(10) COLLATE utf8_spanish_ci NOT NULL,
    `color` VARCHAR(20) COLLATE utf8_spanish_ci NOT NULL,
    `marca` VARCHAR(20) COLLATE utf8_spanish_ci NOT NULL,
    `gps` VARCHAR(2) COLLATE utf8_spanish_ci NOT NULL,
    `wifi` VARCHAR(2) COLLATE utf8_spanish_ci NOT NULL,
    `km` VARCHAR(20) COLLATE utf8_spanish_ci NOT NULL,
    PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE IF NOT EXISTS `categories` (
  `cod` INT NOT NULL,
  `categoria` VARCHAR(45) NULL,
  `img` VARCHAR(150) NULL,
  PRIMARY KEY (`cod`)); 


CREATE TABLE IF NOT EXISTS `img` (
  `car` VARCHAR(150) NOT NULL,
  `url` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`car`, `url`));


CREATE TABLE IF NOT EXISTS `vehicles` (
  `matricula` VARCHAR(7) NOT NULL,
  `precio` VARCHAR(45) NULL,
  `color` VARCHAR(45) NULL,
  `marca` VARCHAR(45) NULL,
  `modelo` VARCHAR(45) NULL,
  `cap_maletero` INT NULL,
  `funcionamiento` VARCHAR(45) NULL,
  `manejo` VARCHAR(45) NULL,
  `gps` VARCHAR(45) NULL,
  `wifi` VARCHAR(45) NULL,
  `km` INT NULL,
  `n_asientos` INT NULL,
  `n_puertas` INT NULL,
  `categoria` INT NULL,
  `visitas` INT NULL,
  PRIMARY KEY (`matricula`));


INSERT INTO vehicles VALUES ('1234ASD', '14500', 'Gris', 'NISSAN', 'JUKE', '50', 'Gasolina', 'Manual', 'yes', 'no', '55000', '5', '5', '2', '0'),
('1234AAA', '17900', 'Blanco', 'AUDI', 'A3', '20', 'Diesel', 'Automatico', 'yes', 'yes', '106500', '5', '4', '2', '0'),
('1234BBB', '10950', 'Negro', 'TOYOTA', 'AURIS', '30', 'Diesel', 'Manual', 'no', 'no', '105000', '5', '5', '2', '0'),
('1234CCC', '13990', 'Blanco', 'MINI', 'ONE', '10', 'Diesel', 'Manual', 'no', 'yes', '96050', '5', '5', '2', '0'),
('1234DDD', '21990', 'Blanco', 'VOLKSWAGEN', 'TIGUAN', '50', 'Diesel', 'Automatico', 'yes', 'yes', '115931', '5', '5', '2', '0'),

('1111ASD', '21500', 'Blanco', 'SEAT', 'LEON', '25', 'Gasolina', 'Manual', 'no', 'no', '0', '5', '5', '0', '0'),
('1111AAA', '32900', 'Verde', 'SEAT', 'ATECA', '55', 'Diesel', 'Automatico', 'yes', 'yes', '0', '5', '5', '0', '0'),
('1111BBB', '47855', 'Blanco', 'MERCEDES-BENZ', 'GLA', '40', 'Hibrido', 'Automatico', 'yes', 'yes', '0', '5', '5', '0', '0'),
('1111CCC', '17900', 'Rojo', 'FIAT', 'TIPO', '20', 'Gasolina', 'Manual', 'no', 'yes', '0', '5', '5', '1', '0'),
('1111DDD', '39605', 'Rose Gold', 'MERCEDES-BENZ', 'CLASE-A', '20', 'Diesel', 'Automatico', 'no', 'no', '0', '5', '5', '0', '0'),

('2222ASD', '42100', 'Gris', 'VOLKSWAGEN', 'ID3', '15', 'Electrico', 'Automatico', 'no', 'yes', '3240', '5', '5', '1', '0'),
('2222AAA', '37490', 'Blanco', 'KIA', 'ENIRO', '30', 'Electrico', 'Automatico', 'yes', 'yes', '5', '5', '5', '1', '0'),
('2222BBB', '27690', 'Rojo', 'HYUNDAI', 'TUCSON', '30', 'Gasolina', 'Manual', 'no', 'no', '5', '5', '5', '1', '0'),
('2222CCC', '32550', 'Naranja', 'PEUGEOT', 'E2008', '25', 'Electrico', 'Automatico', 'yes', 'yes', '1', '5', '5', '1', '0'),
('2222DDD', '37900', 'Blanco', 'ALFA ROMEO', 'STELVIO', '20', 'Gasolina', 'Automatico', 'no', 'no', '7000', '5', '5', '1', '0')


INSERT INTO img VALUES ('1234ASD', 'view/images/cars/NISSAN_JUKE/1.jpg'),
('1234ASD', 'view/images/cars/NISSAN_JUKE/2.jpg'),
('1234ASD', 'view/images/cars/NISSAN_JUKE/3.jpg'),
('1234ASD', 'view/images/cars/NISSAN_JUKE/4.jpg'),

('1234AAA', 'view/images/cars/AUDI_A3/1.jpg'),
('1234AAA', 'view/images/cars/AUDI_A3/2.jpg'),
('1234AAA', 'view/images/cars/AUDI_A3/3.jpg'),
('1234AAA', 'view/images/cars/AUDI_A3/4.jpg'),

('1234BBB', 'view/images/cars/TOYOTA_AURIS/1.jpg'),
('1234BBB', 'view/images/cars/TOYOTA_AURIS/2.jpg'),
('1234BBB', 'view/images/cars/TOYOTA_AURIS/3.jpg'),

('1234CCC', 'view/images/cars/MINI_ONE/1.jpg'),
('1234CCC', 'view/images/cars/MINI_ONE/2.jpg'),
('1234CCC', 'view/images/cars/MINI_ONE/3.jpg'),

('1234DDD', 'view/images/cars/VOLKSWAGEN_TIGUAN/1.jpg'),
('1234DDD', 'view/images/cars/VOLKSWAGEN_TIGUAN/2.jpg'),
('1234DDD', 'view/images/cars/VOLKSWAGEN_TIGUAN/3.jpg'),
('1234DDD', 'view/images/cars/VOLKSWAGEN_TIGUAN/4.jpg'),

('1111ASD', 'view/images/cars/SEAT_LEON_SP/1.jpg'),
('1111ASD', 'view/images/cars/SEAT_LEON_SP/2.jpg'),

('1111AAA', 'view/images/cars/SEAT_ATECA/1.jpg'),
('1111AAA', 'view/images/cars/SEAT_ATECA/2.jpg'),

('1111BBB', 'view/images/cars/MERCEDES_BENZ_GLA/1.jpg'),
('1111BBB', 'view/images/cars/MERCEDES_BENZ_GLA/2.jpg'),

('1111CCC', 'view/images/cars/FIAT_TIPO/1.jpg'),
('1111CCC', 'view/images/cars/FIAT_TIPO/2.jpg'),

('1111DDD', 'view/images/cars/MERCEDES_BENZ_CLASE_A/1.jpg'),
('1111DDD', 'view/images/cars/MERCEDES_BENZ_CLASE_A/2.jpg'),
('1111DDD', 'view/images/cars/MERCEDES_BENZ_CLASE_A/3.jpg'),

('2222ASD', 'view/images/cars/VOLKSWAGEN_ID3/1.jpg'),
('2222ASD', 'view/images/cars/VOLKSWAGEN_ID3/2.jpg'),
('2222ASD', 'view/images/cars/VOLKSWAGEN_ID3/3.jpg'),

('2222AAA', 'view/images/cars/KIA_ENIRO/1.jpg'),
('2222AAA', 'view/images/cars/KIA_ENIRO/2.jpg'),
('2222AAA', 'view/images/cars/KIA_ENIRO/3.jpg'),

('2222BBB', 'view/images/cars/HYUNDAI_TUCSON/1.jpg'),
('2222BBB', 'view/images/cars/HYUNDAI_TUCSON/2.jpg'),
('2222BBB', 'view/images/cars/HYUNDAI_TUCSON/3.jpg'),

('2222CCC', 'view/images/cars/PEUGEOT_E2008/1.jpg'),
('2222CCC', 'view/images/cars/PEUGEOT_E2008/2.jpg'),

('2222DDD', 'view/images/cars/ALFA_ROMEO_STELVIO/1.jpg'),
('2222DDD', 'view/images/cars/ALFA_ROMEO_STELVIO/2.jpg')