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
-- Table structure for table `add_ons`
--

DROP TABLE IF EXISTS `add_ons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `add_ons` (
  `add_ons_id` int(11) NOT NULL AUTO_INCREMENT,
  `add_ons_name` varchar(255) DEFAULT NULL,
  `member_price` int(11) DEFAULT NULL,
  `non_member_price` int(11) DEFAULT NULL,
  `datecreated` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`add_ons_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `add_ons`
--

LOCK TABLES `add_ons` WRITE;
/*!40000 ALTER TABLE `add_ons` DISABLE KEYS */;
INSERT INTO `add_ons` VALUES (1,'Netibo Healing',100,200,'2016-12-30 19:38:55',30),(2,'Ventusa Therapy',100,200,'2016-12-30 19:38:55',30),(3,'Cranio Sacral',150,300,'2016-12-30 19:38:55',30),(4,'Turtlewalk Massage',150,300,'2016-12-30 19:38:55',30),(5,'Steam Bath',150,300,'2016-12-30 19:38:55',30),(6,'Ear Candling',150,300,'2016-12-30 19:38:55',30),(7,'Ear Massage',150,300,'2016-12-30 19:38:55',30),(8,'Back Massage',150,300,'2016-12-30 19:38:55',30),(9,'Head Massage',150,300,'2016-12-30 19:38:55',30),(10,'Foot Scrub',150,300,'2016-12-30 19:38:55',30),(11,'Foot Reflex',150,300,'2016-12-30 19:38:55',30),(12,'Hand Scrub',150,300,'2016-12-30 19:38:55',30),(13,'Hand Reflex',150,300,'2016-12-30 19:38:55',30),(14,'Hot Stone Foot Reflex',150,300,'2016-12-30 19:38:55',30),(15,'Lower Extremities Massage',150,300,'2016-12-30 19:38:55',30),(16,'Hair Spa',150,300,'2016-12-30 19:38:55',30),(17,'Body Scrub',300,600,'2016-12-30 19:38:55',30),(18,'Face Massage',150,300,'2016-12-30 19:38:55',30),(19,'Mask',100,200,'2016-12-30 19:38:55',30),(20,'Pimples-IL',150,300,'2016-12-30 19:38:55',30),(21,'Pricking',150,300,'2016-12-30 19:38:55',30),(22,'Diamond Peel',500,800,'2016-12-30 19:38:55',30);
/*!40000 ALTER TABLE `add_ons` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-04  0:21:26
