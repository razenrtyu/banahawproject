-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: db_banahaw
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `reservationid` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_type` varchar(20) DEFAULT NULL,
  `client_name` varchar(50) DEFAULT NULL,
  `client_type` varchar(50) DEFAULT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `service_type` varchar(50) DEFAULT NULL,
  `service` varchar(50) DEFAULT NULL,
  `add_ons` varchar(255) DEFAULT NULL,
  `products` varchar(50) DEFAULT NULL,
  `attendant_name` varchar(50) DEFAULT NULL,
  `attendantid` int(11) DEFAULT NULL,
  `estimated_time` int(11) DEFAULT NULL,
  `time_spent` int(11) DEFAULT NULL,
  `total_amount` int(11) DEFAULT NULL,
  `payment_type` varchar(50) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `datestart` datetime DEFAULT NULL,
  `dateend` datetime DEFAULT NULL,
  `datecreated` date DEFAULT NULL,
  `res_date` date DEFAULT NULL,
  `res_time` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`reservationid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (6,'Non-Member','sample-Non-member3','Non - Member','Malolos','Healing Packages','Foot Massage Theraphy','Cranio Sacral, Netibo Healing',NULL,'Sample_attendant_3',3,165,NULL,1300,NULL,1,NULL,NULL,'2017-01-31','2017-07-21','10:52 PM'),(7,'Member','Razen Chris G. Marling','Personalized','Malolos','Regular Services','Hot Stone Massage','Ventusa Therapy',NULL,'Sample_attendant_3',3,120,NULL,600,NULL,1,NULL,NULL,'2017-02-01','2017-02-10','09:59 PM'),(8,'Non-Member','Sample_reserve4','Non - Member','Plaridel','Regular Services','5-in-1 Signature Massage','Ventusa Therapy, Cranio Sacral',NULL,'Sample_attendant_3',3,120,NULL,900,NULL,1,NULL,NULL,'2017-02-01','2017-05-18','10:00 AM'),(11,'Member','Razen Chris G. Marling','Personalized','Plaridel','Regular Services','Hot Stone Massage','Netibo Healing',NULL,'Sample_attendant_3',3,120,NULL,100,NULL,1,NULL,NULL,'2017-02-01','2017-02-01','10:37 PM');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-04  2:05:49
