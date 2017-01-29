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
-- Table structure for table `member01`
--

DROP TABLE IF EXISTS `member01`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member01` (
  `member01id` int(11) NOT NULL AUTO_INCREMENT,
  `member00id` int(11) DEFAULT NULL,
  `relationship` varchar(255) DEFAULT NULL,
  `datecreated` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member01id`),
  KEY `member00id` (`member00id`),
  CONSTRAINT `member01_ibfk_1` FOREIGN KEY (`member00id`) REFERENCES `member00` (`member00id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member01`
--

LOCK TABLES `member01` WRITE;
/*!40000 ALTER TABLE `member01` DISABLE KEYS */;
INSERT INTO `member01` VALUES (1,2,'Family','2017-01-23 22:51:00','Toby Ramoso'),(2,2,'Family','2017-01-23 22:51:00','Chitchat'),(3,2,'Family','2017-01-23 22:51:00','Bai Ramoso'),(4,2,'Family','2017-01-23 22:51:00','Ta Mio'),(5,2,'Family','2017-01-23 22:51:00','Pearl'),(6,4,'Family','2017-01-23 22:54:38','ding santiago'),(7,4,'Family','2017-01-23 22:54:38','edu santiago'),(8,4,'Family','2017-01-23 22:54:38','elay santiago'),(9,4,'Family','2017-01-23 22:54:38','da santiago'),(10,4,'Family','2017-01-23 22:54:38','tita santiago'),(26,5,'Family','2017-01-24 00:57:46','samplesub1'),(27,5,'Family','2017-01-24 00:57:46','samplesub2'),(28,5,'Family','2017-01-24 00:57:47','samplesub3'),(29,5,'Family','2017-01-24 00:57:47','samplesub4'),(30,5,'Family','2017-01-24 00:57:47','samplesub5'),(31,8,'Family','2017-01-24 00:59:47','submem1'),(32,8,'Family','2017-01-24 00:59:47','submem2'),(33,8,'Family','2017-01-24 00:59:47','submem3'),(34,8,'Family','2017-01-24 00:59:47','submem4'),(35,8,'Family','2017-01-24 00:59:47','submem5'),(36,10,'Family','2017-01-26 23:28:21','sample_sub1'),(37,10,'Family','2017-01-26 23:28:21','sample_sub2'),(38,10,'Family','2017-01-26 23:28:21','sample_sub3'),(39,10,'Family','2017-01-26 23:28:21','sample_sub4'),(40,10,'Family','2017-01-26 23:28:21','sample_sub5'),(41,12,'Family','2017-02-01 23:42:07','sample_fam1_mem1'),(42,12,'Family','2017-02-01 23:42:08','sample_fam1_mem2'),(43,12,'Family','2017-02-01 23:42:08','sample_fam1_mem3'),(44,12,'Family','2017-02-01 23:42:08','sample_fam1_mem4'),(45,12,'Family','2017-02-01 23:42:08','sample_fam1_mem5'),(46,6,'Family','2017-02-01 23:42:41','asdsqwe'),(47,6,'Family','2017-02-01 23:42:41','qweqwesadc'),(48,6,'Family','2017-02-01 23:42:41','adsasdaweq'),(49,6,'Family','2017-02-01 23:42:41','eqweqweqwe'),(50,6,'Family','2017-02-01 23:42:41','asdasdasd'),(51,11,'Family','2017-02-01 23:53:27','qweqwe'),(52,11,'Family','2017-02-01 23:53:27','qweqxzczxc'),(53,11,'Family','2017-02-01 23:53:27','xzccxc'),(54,11,'Family','2017-02-01 23:53:27','xasdas'),(55,11,'Family','2017-02-01 23:53:27','zxczxcxz'),(56,7,'Family','2017-02-01 23:55:01','qweqw'),(57,7,'Family','2017-02-01 23:55:01','qweqwewq'),(58,7,'Family','2017-02-01 23:55:01','wqeqwe'),(59,7,'Family','2017-02-01 23:55:01','qweqweqwe'),(60,7,'Family','2017-02-01 23:55:01','qweqweqwe'),(61,13,'Family','2017-02-02 00:06:28','qqqqqqqqqq'),(62,13,'Family','2017-02-02 00:06:28','wwwwwwwwwww'),(63,13,'Family','2017-02-02 00:06:28','ssssssssssss'),(64,13,'Family','2017-02-02 00:06:28','xxxxxxxxz'),(65,13,'Family','2017-02-02 00:06:28','zzzzzzzzzzzz'),(66,14,'Family','2017-02-02 00:12:19','jkjkjkj'),(67,14,'Family','2017-02-02 00:12:19','hghfghfg'),(68,14,'Family','2017-02-02 00:12:19','hdfgdfgdf'),(69,14,'Family','2017-02-02 00:12:19','dfgdftgert'),(70,14,'Family','2017-02-02 00:12:19','ertertert'),(71,15,'Family','2017-02-02 00:16:53','qqqqqqqqqqqq'),(72,15,'Family','2017-02-02 00:16:53','wwwwwwwwwww'),(73,15,'Family','2017-02-02 00:16:53','sssssssssd'),(74,15,'Family','2017-02-02 00:16:53','ccccccccccc'),(75,15,'Family','2017-02-02 00:16:53','xxxxxxxxxxx'),(76,16,'Family','2017-02-02 00:23:06','s'),(77,16,'Family','2017-02-02 00:23:06','d'),(78,16,'Family','2017-02-02 00:23:06','x'),(79,16,'Family','2017-02-02 00:23:06','a'),(80,16,'Family','2017-02-02 00:23:06','s'),(81,17,'Family','2017-02-02 00:26:51','s'),(82,17,'Family','2017-02-02 00:26:51','s2'),(83,17,'Family','2017-02-02 00:26:51','x'),(84,17,'Family','2017-02-02 00:26:51','d'),(85,17,'Family','2017-02-02 00:26:51','a');
/*!40000 ALTER TABLE `member01` ENABLE KEYS */;
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
