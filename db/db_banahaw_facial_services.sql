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
-- Table structure for table `facial_services`
--

DROP TABLE IF EXISTS `facial_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facial_services` (
  `facial_services_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `facial_services_name` varchar(255) NOT NULL,
  `member_price` int(11) NOT NULL,
  `non_member_price` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `datecreated` datetime NOT NULL,
  PRIMARY KEY (`facial_services_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facial_services`
--

LOCK TABLES `facial_services` WRITE;
/*!40000 ALTER TABLE `facial_services` DISABLE KEYS */;
INSERT INTO `facial_services` VALUES (1,'Facial Cleaning w/o Machine',200,300,60,'2017-04-15 14:05:35'),(2,'Basic Facial w/ Vacumm High Frequency',250,350,60,'2017-04-15 14:05:35'),(3,'Deep Cleaning Facial w/ Vacumm, Brush/Spray, High Frequency and Pricking',300,400,60,'2017-04-15 14:05:35'),(4,'Intensive Facial w/ Vacumm, Brush/Spray, High Frequency and Pricking',400,600,60,'2017-04-15 14:05:35'),(5,'Facial Package(Diamond Peel, Deep Cleaning, Mask)',900,1500,60,'2017-04-15 14:05:35'),(6,'Warts Removal(Light)',1500,1500,60,'2017-04-15 14:05:35'),(7,'Warts Removal(Moderate)',2000,2000,60,'2017-04-15 14:05:35'),(8,'Warts Removal(Severe)',2500,2500,60,'2017-04-15 14:05:35');
/*!40000 ALTER TABLE `facial_services` ENABLE KEYS */;
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
