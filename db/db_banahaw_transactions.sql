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
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `transactionid` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`transactionid`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (3,'Member','Ramoso, John Ephraim Ribaya','Family','Malolos','Healing Packages','Take-all-you-can(TODOS-TODOS)','Cranio Sacral',NULL,'Sample_attendant_2',2,170,4883,750,'Cash',0,'2017-01-14 16:01:15','2017-01-18 09:24:24','2017-01-14'),(8,'Member','Ramoso, John Ephraim Ribaya','Family','Malolos','Regular Services','5-in-1 Signature Massage','Ventusa Therapy, Netibo Healing',NULL,'Sample_attendant_1',1,120,5875,200,'Cash',0,'2017-01-14 22:33:45','2017-01-19 08:28:48','2017-01-14'),(13,'Walk-In','sample3','Non - Member','Plaridel','Regular Services','5-in-1 Signature Massage','Netibo Healing',NULL,'Sample_attendant_1',1,90,5840,600,'Gift Check',0,'2017-01-14 23:08:53','2017-01-19 08:28:59','2017-01-14'),(15,'Walk-In','sample5','Non - Member','Malolos','Regular Services','Hot Stone Massage','Ventusa Therapy, Netibo Healing, Turtlewalk Massage, Ear Candling, Ear Massage, Back Massage, Head Massage, Foot Scrub, Cranio Sacral, Hand Scrub',NULL,'Sample_attendant_1',1,390,2940,3500,'Gift Check',0,'2017-01-15 00:26:57','2017-01-17 09:26:05','2017-01-14'),(16,'Member','Marling, Razen Chris Gayoso','Personalized','Malolos','Regular Services','Relaxing Swedish Massage','Netibo Healing',NULL,'Sample_attendant_1',1,90,2231,250,'Gift Check',0,'2017-01-15 12:14:35','2017-01-17 09:25:58','2017-01-15'),(17,'Walk-In','sample 6','Non - Member','Malolos','Regular Services','Relaxing Swedish Massage','Netibo Healing',NULL,'Sample_attendant_1',1,90,795,450,'Cash',0,'2017-01-16 12:00:58','2017-01-17 09:15:10','2017-01-15'),(18,'Member','Marling, Razen Chris Gayoso','Personalized','Malolos','Regular Services','Hot Stone Massage','Netibo Healing, Cranio Sacral',NULL,'Sample_attendant_2',2,150,NULL,250,NULL,NULL,'2017-01-17 01:53:02',NULL,'2017-01-17'),(19,'Member','Ramoso, John Ephraim Ribaya','Family','Malolos','Healing Packages','Muscle Pain and Spasm Healing','Ventusa Therapy, Cranio Sacral',NULL,'Sample_attendant_2',2,165,NULL,650,NULL,NULL,'2017-01-17 01:53:29',NULL,'2017-01-17'),(20,'Walk-In','sample99','Non - Member','Malolos','Healing Packages','Muscle Pain and Spasm Healing','Ventusa Therapy, Turtlewalk Massage, Steam Bath, Ear Candling',NULL,'Sample_attendant_2',2,225,NULL,1900,NULL,NULL,'2017-01-17 01:53:53',NULL,'2017-01-17'),(22,'Walk-In','sample101','Non - Member','Sta.Rita','Regular Services','Hot Stone Massage','Ventusa Therapy',NULL,'Sample_attendant_2',2,120,2792,900,'Gift Check',0,'2017-01-17 01:57:49','2017-01-19 08:29:17','2017-01-17'),(23,'Walk-In','sample102','Non - Member','Plaridel','Regular Services','5-in-1 Signature Massage','Netibo Healing',NULL,'Sample_attendant_1',1,90,1387,600,'Cash',0,'2017-01-18 01:22:25','2017-01-19 08:29:19','2017-01-18'),(24,'Member','Marling, Razen Chris Gayoso','Personalized','Malolos','Regular Services','5-in-1 Signature Massage','Netibo Healing, Steam Bath, Cranio Sacral, Ear Candling, Ear Massage, Turtlewalk Massage, Back Massage, Head Massage, Foot Reflex, Foot Scrub',NULL,'Sample_attendant_3',3,360,8,1450,'Cash',0,'2017-01-19 00:21:40','2017-01-19 08:29:22','2017-01-18'),(25,'Walk-In','sasmple102','Non - Member','Sta.Rita','Healing Packages','Muscle Pain and Spasm Healing','Ventusa Therapy',NULL,'Sample_attendant_2',2,135,8,1000,'Cash',0,'2017-01-19 00:21:58','2017-01-19 08:29:24','2017-01-18'),(26,'Member','Marling, Razen Chris Gayoso','Personalized','Malolos','Regular Services','Hot Stone Massage','Ventusa Therapy',NULL,'Sample_attendant_2',2,120,1376,100,'Cash',0,'2017-01-19 00:29:50','2017-01-20 07:25:27','2017-01-18'),(27,'Member','Ramoso, John Ephraim Ribaya','Family','Plaridel','Healing Packages','Lower Back Pain Healing','Ventusa Therapy',NULL,'Sample_attendant_2',2,135,1331,500,'Cash',0,'2017-01-19 23:25:41','2017-01-21 05:36:23','2017-01-19'),(28,'Walk-In','razeb','Non - Member','Pulilan','Healing Packages','Relaxation and Healing','Cranio Sacral, Ventusa Therapy',NULL,'Sample_attendant_2',2,165,5747,1500,'Cash',0,'2017-01-19 23:25:59','2017-01-24 07:12:34','2017-01-19'),(29,'Member','Ramoso, John Ephraim Ribaya','Family','Malolos','Regular Services','Relaxing Swedish Massage','Netibo Healing, Cranio Sacral',NULL,'Sample_attendant_1',1,120,8768,450,'Cash',0,'2017-01-20 21:35:56','2017-01-27 07:43:17','2017-01-20'),(30,'Walk-In','rasdasdas','Non - Member','Malolos','Regular Services','5-in-1 Signature Massage','Ventusa Therapy',NULL,'Sample_attendant_3',3,90,8711,600,'Gift Check',0,'2017-01-20 22:32:10','2017-01-27 07:43:20','2017-01-20'),(32,'Member','Marling, Razen Chris Gayoso','Personalized','Malolos','Regular Services','5-in-1 Signature Massage','Netibo Healing',NULL,'Sample_attendant_3',3,90,7917,350,'Cash',0,'2017-01-21 11:46:47','2017-01-27 07:43:23','2017-01-21'),(36,'Member','Ephraim Ramoso','Family','Malolos','Healing Packages','Lower Back Pain Healing','Netibo Healing',NULL,'Sample_attendant_2',2,135,9951,500,'Gift Check',0,'2017-01-23 23:10:18','2017-01-31 05:01:20','2017-01-23'),(41,'Member','Razen Chris G. Marling','Personalized','Malolos','Healing Packages','Muscle Pain and Spasm Healing','Netibo Healing',NULL,'Sample_attendant_1',1,135,7139,500,'Cash',0,'2017-01-27 23:58:30','2017-02-02 06:57:47','2017-01-27'),(42,'Walk-In','sample_reservation','Non - Member','Plaridel','Healing Packages','Lower Back Pain Healing','Ventusa Therapy',NULL,'Sample_attendant_1',1,135,NULL,1000,NULL,1,'2017-01-27 23:59:02',NULL,'2017-01-27'),(44,'Walk-In','sample_reservation2','Non - Member','Malolos','Regular Services','5-in-1 Signature Massage','Ventusa Therapy',NULL,'Sample_attendant_2',2,90,NULL,600,NULL,1,'2017-01-27 23:59:35',NULL,'2017-01-27'),(45,'Member','Razen Chris G. Marling','Personalized','Sta.Rita','Regular Services','Take-all-you-can(TODOS-TODOS)','Ventusa Therapy',NULL,'Sample_attendant_2',2,170,NULL,700,NULL,1,'2017-01-28 16:03:22',NULL,'2017-01-28'),(46,'Member','Razen Chris G. Marling','Personalized','Malolos','Regular Services','5-in-1 Signature Massage','Netibo Healing',NULL,'Sample_attendant_3',3,90,3635,350,'Gift Check',0,'2017-01-30 11:00:21','2017-02-01 23:35:47','2017-01-30'),(53,'Member','sample_personalized2','Personalized','Malolos','Regular Services','5-in-1 Signature Massage','Ventusa Therapy',NULL,'Sample_attendant_3',3,90,1368,100,'Cash',0,'2017-02-01 00:16:36','2017-02-02 07:04:17','2017-01-31'),(62,'Non-Member','sample-Non-member3','Non - Member','Malolos','Healing Packages','Foot Massage Theraphy','Cranio Sacral, Netibo Healing',NULL,'Sample_attendant_3',3,165,64,1300,'Gift Check',0,'2017-02-01 21:57:38','2017-02-02 07:01:14','2017-02-01'),(64,'Non-Member','sample_reserv5','Non - Member','Plaridel','Healing Packages','Take-all-you-can(TODOS-TODOS)','Ventusa Therapy, Turtlewalk Massage',NULL,'Sample_attendant_4',4,200,19,1700,'Cash',0,'2017-02-01 22:36:42','2017-02-02 06:55:23','2017-02-01'),(65,'Non-Member','sample_reserv5','Non - Member','Sta.Rita','Healing Packages','Foot Massage Theraphy','Netibo Healing',NULL,'Sample_attendant_3',3,135,15,1000,'Gift Check',0,'2017-02-01 22:38:53','2017-02-02 06:53:45','2017-02-01'),(66,'Member','sample_personalized1','Family','Plaridel','Healing Packages','Foot Massage Theraphy','Ventusa Therapy, Cranio Sacral',NULL,'Sample_attendant_4',4,165,1,650,'Cash',0,'2017-02-01 23:36:48','2017-02-01 23:37:15','2017-02-01'),(67,'Member','Razen Chris G. Marling','Personalized','Plaridel','Healing Packages','Muscle Pain and Spasm Healing','Ventusa Therapy, Cranio Sacral',NULL,'Sample_attendant_1',1,165,NULL,650,NULL,1,'2017-02-01 23:39:48',NULL,'2017-02-01'),(68,'Walk-In','sample_nonmember_999','Non - Member','Plaridel','Healing Packages','Relaxation and Healing','Cranio Sacral',NULL,'Sample_attendant_2',2,135,1378,1300,'Cash',0,'2017-02-01 23:40:08','2017-02-02 22:38:38','2017-02-01');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
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
