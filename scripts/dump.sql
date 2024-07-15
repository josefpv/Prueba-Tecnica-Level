/*BASE DE DATOS*/
CREATE DATABASE IF NOT EXISTS `test_tecnico` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

/*TABLAS*/
CREATE TABLE IF NOT EXISTS `autores` (
  `rut` int NOT NULL,
  `dv` char(1) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `nombre_completo` varchar(60) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_spanish2_ci NOT NULL,
  PRIMARY KEY (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

CREATE TABLE IF NOT EXISTS `libros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(60) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `year` int NOT NULL,
  `genero` varchar(45) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `numero_paginas` int NOT NULL,
  `autor_rut` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_autor_rut_idx` (`autor_rut`),
  CONSTRAINT `fk_autor_rut` FOREIGN KEY (`autor_rut`) REFERENCES `autores` (`rut`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*USUARIO*/
CREATE USER 'level'@'%' IDENTIFIED BY 'level123'; 
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT ON test_tecnico.* TO 'level'@'%'; 

/*DATOS*/
INSERT INTO autores (`rut`,`dv`,`nombre_completo`,`fecha_nacimiento`,`email`) VALUES (19806277,'4','Nicolas Araya','1997-12-09','nicolas@ejemplo.com');
INSERT INTO autores (`rut`,`dv`,`nombre_completo`,`fecha_nacimiento`,`email`) VALUES (26539208,'3','Jose Peñaloza','1995-09-12','jpenaloza@ejemplo.com');
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (19,'Bacterias y Algas Marinas',2021,'Ensayo',300,19806277);
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (20,'Micología y Estudios de Hongos en Patagonia Chilena',2024,'Ensayo',150,19806277);
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (21,'Python para Principiantes',2023,'No ficción',60,19806277);
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (22,'Bioquímica Clínica Tomo 1',2019,'Salud',200,19806277);
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (23,'Bioquímica Clínica Tomo 2',2019,'Salud',350,19806277);
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (24,'Las Aventuras del Camello Gigante',2022,'Aventura',80,19806277);
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (25,'Huída a las afueras de Santiago',2022,'Terror',124,19806277);
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (26,'Historia de Horror Americano',2011,'Misterio',343,19806277);
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (27,'La Casa del Dragón',2010,'Fantasía',460,19806277);
INSERT INTO libros (`id`,`titulo`,`year`,`genero`,`numero_paginas`,`autor_rut`) VALUES (28,'Juego de Tronos',2008,'Fantasía',377,19806277);
