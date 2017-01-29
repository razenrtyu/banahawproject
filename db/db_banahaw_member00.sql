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
-- Table structure for table `member00`
--

DROP TABLE IF EXISTS `member00`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member00` (
  `member00id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `landline_number` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `birthdate` varchar(255) DEFAULT NULL,
  `membertype` varchar(255) DEFAULT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `datecreated` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `membershipcost` int(11) DEFAULT NULL,
  `attendant_name` varchar(255) DEFAULT NULL,
  `attendantid` int(11) DEFAULT NULL,
  `upgraded` date DEFAULT NULL,
  `upgraded_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`member00id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member00`
--

LOCK TABLES `member00` WRITE;
/*!40000 ALTER TABLE `member00` DISABLE KEYS */;
INSERT INTO `member00` VALUES (1,'21 Masagana Homes Sta.Rita, Guiguinto, Bulacan','09756666686','690-74-04','razen.marling@gmail.com','13-October-1992','Personalized','friends','2017-01-23','Razen Chris G. Marling',300,NULL,NULL,NULL,NULL),(2,'Masagana','09753921395','666-666','eph@gmail.com','20-October-1990','Family','Flyers/Brochure','2017-01-23','Ephraim Ramoso',600,NULL,NULL,NULL,NULL),(3,'Masagana','09857895565','6985896','may@gmail.com','10-May-1998','Personalized','Signages/Tarpaulin','2017-01-23','Rosselle Marling',300,NULL,NULL,NULL,NULL),(4,'Masagana','09857894562','6908598','duds@gmail.com','06-December-1990','Family','Friends/Relatives','2017-01-23','Edison Santiago',600,NULL,NULL,NULL,NULL),(5,'masagana','1234567890','123456','sample_personalized1@gmail.com','11-January-2017','Family','Flyers/Brochure','2017-01-24','sample_personalized1',600,NULL,NULL,NULL,NULL),(6,'masgana','123456789','123456','sample_personalized2@gmail.com','04-January-2017','Family','Facebook/Internet','2017-01-24','sample_personalized2',600,NULL,NULL,NULL,NULL),(7,'sta.rita','123456789','123456','sample_personalized1@yahoo.com','17-January-2017','Family','Facebook/Internet','2017-01-24','sample_personalized1',600,NULL,NULL,NULL,NULL),(8,'sta.rita','123456789','987654','sample_family1@gmail.com','05-January-2017','Family','Signages/Tarpaulin','2017-01-24','sample_family1',600,NULL,NULL,NULL,NULL),(9,'guiguinto','123456789','123456','Personalized_member1@gmail.com','12-January-2017','Personalized','Flyers/Brochure','2017-01-26','Personalized_member1',300,'Sample_attendant_2',2,NULL,NULL),(10,'malolos','123456789','123456','Family_member1@gmail.com','18-January-2017','Family','Flyers/Brochure','2017-01-26','Family_member1',600,'Sample_attendant_2',2,NULL,NULL),(11,'sample_address','123456789','123456','gipsy_danger@gmail.com','08-February-1968','Family','Friends/Relatives','2017-02-01','gipsy danger',600,'Sample_attendant_1',1,NULL,NULL),(12,'sample address','123456789','123456','sample_fam1@yahoo.com','11-February-1988','Family','Flyers/Brochure','2017-02-01','sample_fam1',600,'Sample_attendant_1',1,NULL,NULL),(13,'qweqwe','123213213','1232','sample_per1@y.c','01-February-2017','Family','asdsadasd','2017-02-02','sample_per1',600,'Sample_attendant_2',2,NULL,NULL),(14,'sample','12345612312','12345','sample_per2@gmail.com','03-February-2017','Family','Signages/Tarpaulin','2017-02-02','sample_per2',600,'Sample_attendant_5',5,NULL,NULL),(15,'qweqweqwe','12345435','123','sample_per3@gmail.com','01-February-2017','Family','Facebook/Internet','2017-02-02','sample_per3',600,'Sample_attendant_1',1,NULL,NULL),(16,'qweqweqwewq','1231','123123','qweqwewqe','03-February-2017','Family','Facebook/Internet','2017-02-02','sample_per4',600,'Sample_attendant_5',5,'2017-02-02',NULL),(17,'qweqweqweqwe','13345435','123123','aedsadasdsa','17-February-2017','Family','Friends/Relatives','2017-02-02','sample_per5',600,'Sample_attendant_1',1,'2017-02-02',5);
/*!40000 ALTER TABLE `member00` ENABLE KEYS */;
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
