CREATE TABLE IF NOT EXISTS `Users` (
  `idUser` int unsigned NOT NULL AUTO_INCREMENT,
  `idProvider` varchar(30) NOT NULL,
  `provider` varchar(30) NOT NULL,
  `name` varchar(60) NOT NULL,
  `isAdmin` integer(1) DEFAULT 0,  
  `dateRegistration` datetime NOT NULL,
  `dateLastLogin` datetime DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `Apartments` (
  `idApartment` int unsigned NOT NULL AUTO_INCREMENT,
  `nameApartment` varchar(60) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  `numberPeople` int(2) unsigned NOT NULL,
  `priceDay` DECIMAL(5, 2) NOT NULL,
  PRIMARY KEY (`idApartment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `Gallery` (
  `idGallery` int unsigned NOT NULL AUTO_INCREMENT,
  `idApartment` int unsigned NOT NULL,
  `fileGallery` varchar(200) NOT NULL,
  `default` integer(1) DEFAULT 0,
  FOREIGN KEY (idApartment) REFERENCES Apartments(idApartment),
  PRIMARY KEY (`idGallery`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `Bookings` (
  `idBooking` int unsigned NOT NULL AUTO_INCREMENT,
  `idApartment` int unsigned NOT NULL,
  `idUser` int unsigned NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `status` ENUM('unconfirmed', 'confirmed', 'canceled'),
  PRIMARY KEY (`idBooking`),
  FOREIGN KEY (idUser) REFERENCES Users(idUser),
  FOREIGN KEY (idApartment) REFERENCES Apartments(idApartment)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
