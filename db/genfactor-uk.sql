CREATE DATABASE  IF NOT EXISTS `genfactor_dt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `genfactor_dt`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: genfactor_dt
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `level` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (101,'admin','11111','hubert.pulik@gmail.com','master_admin');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing_data`
--

DROP TABLE IF EXISTS `billing_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing_data` (
  `userId` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `tax` int unsigned DEFAULT NULL,
  `adress` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `phone` int DEFAULT NULL,
  `custom_field_1` varchar(255) DEFAULT NULL,
  `custom_field_2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing_data`
--

LOCK TABLES `billing_data` WRITE;
/*!40000 ALTER TABLE `billing_data` DISABLE KEYS */;
INSERT INTO `billing_data` VALUES (101,'Adam Kowalski','Affinity',239485867,'Warszawska 18','Siedlce','05-034','PL',505607890,NULL,NULL);
/*!40000 ALTER TABLE `billing_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `itemId` int NOT NULL AUTO_INCREMENT,
  `cartId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`itemId`),
  UNIQUE KEY `itemId_UNIQUE` (`itemId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,121235235,102,1),(2,121235235,104,4),(3,121235235,107,3),(4,34359346,101,1),(5,34359346,105,2),(6,34359346,109,1),(9,34359346,103,5);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `create_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121235236 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (34359346,102,'2013-06-20'),(121235235,101,'2010-10-20');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_in_carts`
--

DROP TABLE IF EXISTS `items_in_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_in_carts` (
  `itemId` int NOT NULL,
  `cartId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`itemId`),
  UNIQUE KEY `itemId_UNIQUE` (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_in_carts`
--

LOCK TABLES `items_in_carts` WRITE;
/*!40000 ALTER TABLE `items_in_carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `items_in_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint DEFAULT NULL,
  `userId` varchar(55) DEFAULT NULL,
  `billingData` text,
  `shippingData` text,
  `orderItems` text,
  `orderValue` float DEFAULT NULL,
  `shippingMethod` varchar(45) DEFAULT NULL,
  `shippingCost` float DEFAULT NULL,
  `paymentMethod` varchar(145) DEFAULT NULL,
  `paymentStatus` varchar(45) DEFAULT 'PENDING',
  `orderInfo` longtext,
  `status` varchar(45) DEFAULT NULL,
  `unread` varchar(45) DEFAULT NULL,
  `notes` longtext,
  `invoice` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1088 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ref_number` varchar(100) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `weight` varchar(55) DEFAULT NULL,
  `dimensions` varchar(255) DEFAULT NULL,
  `main_img` varchar(255) DEFAULT NULL,
  `img_gallery` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (101,'Gen Factor Base','2023-BASE-001','DLA PARTNERÓW','<p>...</p>','0.25','15, 20, 20','../assets/GF-base.jpg',NULL),(102,'Gen Factor No 01','2023-GFZ - 01','DLA PARTNERÓW','<p>...</p>','0.25','15, 20, 20','../assets/GF-01.jpg',NULL),(103,'Gen Factor No 02','2023-GFZ-02','DLA PARTNERÓW','<p>...</p>','0.25','15, 20, 20','../assets/GF-02.jpg',NULL),(104,'Gen Factor No 03','2023-GFZ-03','DLA PARTNERÓW','<p>...</p>','0.25','15, 20, 20','../assets/GF-03.jpg',NULL),(105,'Gen Factor No 05','2023-GFZ-05','DLA PARTNERÓW','<p>...</p>','0.25','15, 20, 20','../assets/GF-05.jpg',NULL),(106,'Gen Factor No 06','2023-GFZ-06','DLA PARTNERÓW','<p>...</p>','0.25','15, 20, 20','../assets/GF-06.jpg',NULL),(107,'Gen Factor No 07','2023-GFZ-07','Kategoria trzecia','<p>...</p>','0.25','15, 20, 20','../assets/GF-07.jpg',NULL),(108,'Gen Factor No 08','2023-GFZ-08','Kategoria druga','<p>...</p>','0.25','15, 20, 20','../assets/GF-08.jpg',NULL),(109,'Gen Factor No 09','2023-GFZ-09','Kategoria trzecia','<p>...</p>','0.25','15, 20, 20','../assets/GF-09.jpg',NULL),(117,'Gen Factor Personal Care BLUE','2023-PCB-001','DLA PARTNERÓW','<p>...</p>',NULL,NULL,'../assets/PC-blue.jpg',NULL),(118,'Gen Factor Personal Care GREEN','2022-PCG-001','Kategoria nowego produktu','<p>...</p>',NULL,NULL,'../assets/PC-green.jpg',NULL),(119,'Gen Factor Personal Care RED','2022-PCR-001','DLA PARTNERÓW','<p>...</p>',NULL,NULL,'../assets/PC-red.jpg',NULL),(120,'Gen Factor pH Nicotinic','2023-PHNT-001','DLA PARTNERÓW','<p>...</p>',NULL,NULL,'../assets/GF-nicotinic.jpg',NULL),(121,'Gen Factor pH Caffeic','2023-PHCF-001','DLA PARTNERÓW','<p>...</p>',NULL,NULL,'../assets/GF-caffeic.jpg',NULL),(122,'Gen Factor pH CINNAMIC','2023-PHCN-001','DLA PARTNERÓW','<p>...</p>',NULL,NULL,'../assets/GF-cinnamic.jpg',NULL),(123,'Gen Factor pH Humic A','2023-PHHA-001','DLA PARTNERÓW','<p>...</p>',NULL,NULL,'../assets/GF-humica.jpg',NULL),(124,'qwe','121212','qwe','<p>Opis</p>',NULL,NULL,'../assets/GF-01.jpg',NULL),(125,'zzz','123444','111','<p>asdfg</p>',NULL,NULL,'../assets/PC-blue.jpg',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_pricing`
--

DROP TABLE IF EXISTS `products_pricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_pricing` (
  `id` int unsigned NOT NULL,
  `netto` decimal(10,2) unsigned NOT NULL,
  `brutto_a` decimal(10,2) unsigned DEFAULT '0.00',
  `brutto_b` decimal(10,2) DEFAULT '0.00',
  `brutto_c` decimal(10,2) DEFAULT '0.00',
  `brutto_d` decimal(10,2) DEFAULT '0.00',
  `vat` double unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_pricing`
--

LOCK TABLES `products_pricing` WRITE;
/*!40000 ALTER TABLE `products_pricing` DISABLE KEYS */;
INSERT INTO `products_pricing` VALUES (101,255.00,204.00,178.00,255.00,255.00,1.23),(102,380.00,122.00,0.00,0.00,0.00,1.23),(103,380.00,233.00,0.00,0.00,0.00,1.23),(104,420.00,32.00,0.00,0.00,0.00,1.23),(105,490.00,444.00,0.00,0.00,0.00,1.23),(106,490.00,12.00,0.00,0.00,0.00,1.23),(107,450.00,23.00,0.00,0.00,0.00,1.23),(108,450.00,333.00,0.00,0.00,0.00,1.23),(109,450.00,90.00,0.00,0.00,0.00,1.23),(117,211.00,1111.00,0.00,0.00,0.00,1.23),(118,169.00,222.00,0.00,0.00,0.00,1.23),(119,211.00,211.00,0.00,0.00,0.00,1.23),(120,290.00,340.00,0.00,0.00,0.00,1.23),(121,340.00,340.00,0.00,0.00,0.00,1.23),(122,300.00,300.00,0.00,0.00,0.00,1.23),(123,230.00,230.00,0.00,0.00,0.00,1.23),(124,244.00,244.00,222.00,244.00,244.00,1.23),(125,111.00,222.00,333.00,111.00,111.00,1.22);
/*!40000 ALTER TABLE `products_pricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_stock`
--

DROP TABLE IF EXISTS `products_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_stock` (
  `prodId` int NOT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`prodId`),
  UNIQUE KEY `prodId_UNIQUE` (`prodId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_stock`
--

LOCK TABLES `products_stock` WRITE;
/*!40000 ALTER TABLE `products_stock` DISABLE KEYS */;
INSERT INTO `products_stock` VALUES (101,111),(102,88),(103,221),(104,85),(105,987),(106,233),(107,1111),(108,12),(109,25),(117,5555),(118,1000),(119,1111),(120,150),(121,111),(122,111),(123,222),(124,11111),(125,321);
/*!40000 ALTER TABLE `products_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL,
  `rating` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (101,3.3),(102,4),(103,3),(104,2),(105,1),(106,1),(107,2),(108,3),(109,5),(117,0),(118,0),(119,0),(120,0),(121,0),(122,0),(123,0),(124,0),(125,0);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_billing`
--

DROP TABLE IF EXISTS `user_billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_billing` (
  `userId` varchar(55) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `taxNumber` varchar(55) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `addressNumber1` varchar(45) DEFAULT NULL,
  `addressNumber2` varchar(45) DEFAULT NULL,
  `zipCode` varchar(45) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `isCompany` varchar(55) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `user_id_UNIQUE` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_billing`
--

LOCK TABLES `user_billing` WRITE;
/*!40000 ALTER TABLE `user_billing` DISABLE KEYS */;
INSERT INTO `user_billing` VALUES ('1015','Adam','Saski',NULL,NULL,'Opolska','22','22','03-456','Cośtam','pl','577903117',NULL),('15395','Adam','Adamski',NULL,NULL,'Moniuszki 4/20','4','20','21-300','Radzyń Podlaski','pl','577903117',NULL),('20727','Adam','Adamski',NULL,NULL,'Piękna','23','122','23-400','Chełm','pl','543111222',NULL),('50305','Adam','Adamski',NULL,NULL,'Piękna','23','122','23-400','Chełm','pl','543111222',NULL),('5033','Adam','Adamski',NULL,NULL,'Piękna','23','122','23-400','Chełm','pl','543111222',NULL),('68127','Adam','Adamski',NULL,NULL,'Piękna','23','122','23-400','Chełm','pl','543111222',NULL),('71290','Adam','Adamski',NULL,NULL,'Piękna','23','122','23-400','Chełm','pl','543111222',NULL),('76137','Adam','Adamski',NULL,NULL,'Piękna','23','122','23-400','Chełm','pl','543111222',NULL),('79607','Adam','Adamski',NULL,NULL,'Piękna','23','122','23-400','Chełm','pl','543111222',NULL),('80060','Adam','Adamski',NULL,NULL,'Piękna','23','122','23-400','Chełm','pl','543111222',NULL),('98706','Adam','Adamski',NULL,NULL,'Piękna','23','122','23-400','Chełm','pl','543111222',NULL);
/*!40000 ALTER TABLE `user_billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_shipping`
--

DROP TABLE IF EXISTS `user_shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_shipping` (
  `userId` varchar(55) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `addressNumber1` varchar(45) DEFAULT NULL,
  `addressNumber2` varchar(45) DEFAULT NULL,
  `pointName` varchar(45) DEFAULT NULL,
  `zipCode` varchar(45) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `user_id_UNIQUE` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_shipping`
--

LOCK TABLES `user_shipping` WRITE;
/*!40000 ALTER TABLE `user_shipping` DISABLE KEYS */;
INSERT INTO `user_shipping` VALUES ('1015','Adam','Saski',NULL,'Opolska','22','22',NULL,'03-456','Cośtam','pl','577903117'),('15395','Adam','Adamski',NULL,'Moniuszki 4/20','4','20',NULL,'21-300','Radzyń Podlaski','pl','577903117'),('20727','Adam','Adamski',NULL,'Kolejowa','34',NULL,'CHE01ML','22-100','Chełm','pl','543111222'),('5033','Adam','Adamski',NULL,'Kolejowa','34',NULL,'CHE01ML','22-100','Chełm','pl','543111222'),('68127','Adam','Adamski',NULL,'Kolejowa','34',NULL,'CHE01ML','22-100','Chełm','pl','543111222'),('71290','Adam','Adamski',NULL,'Kolejowa','34',NULL,'CHE01ML','22-100','Chełm','pl','543111222'),('76137','Adam','Adamski',NULL,'Kolejowa','34',NULL,'CHE01ML','22-100','Chełm','pl','543111222'),('79607','Adam','Adamski',NULL,'Kolejowa','34',NULL,'CHE01ML','22-100','Chełm','pl','543111222'),('80060','Adam','Adamski',NULL,'Kolejowa','34',NULL,'CHE01ML','22-100','Chełm','pl','543111222'),('98706','Adam','Adamski',NULL,'Kolejowa','34',NULL,'CHE01ML','22-100','Chełm','pl','543111222');
/*!40000 ALTER TABLE `user_shipping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `timestamp` bigint DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1020 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1003,'adam@kowal.pl','$2b$10$T5AbLnlIoKPMtYrQdBhblOO1sJmZCABoyGC2ZbqLOQDpcexo/Wf7y',1689174262552,'partner30'),(1019,'kowal.mistyk@gmail.com','$2b$10$1onzaYGlXmFOprcy49E05.Fpr1Rcw0wnESHuhXQbPAmzC6YtqIbea',1692115944555,'client');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 11:03:27
