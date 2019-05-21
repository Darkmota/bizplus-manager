/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : bizplus

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 21/05/2019 18:43:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for carousel
-- ----------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel`  (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `is_show` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `title_locale_id` int(12) NOT NULL,
  `content_locale_id` int(12) NOT NULL,
  `version` int(12) NOT NULL,
  `create_time` datetime(0) NOT NULL,
  `url` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name_locale_id` int(12) NOT NULL,
  `version` int(12) NOT NULL,
  `create_time` datetime(0) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for homepage
-- ----------------------------
DROP TABLE IF EXISTS `homepage`;
CREATE TABLE `homepage`  (
  `tel` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `consultation_time` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `google_map_url` varchar(2000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `contact` varchar(2000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `footer_contact` varchar(2000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for locale
-- ----------------------------
DROP TABLE IF EXISTS `locale`;
CREATE TABLE `locale`  (
  `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ja_JP` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `zh_CN` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `en_US` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `version` int(12) NOT NULL,
  `create_time` datetime(0) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for our_event
-- ----------------------------
DROP TABLE IF EXISTS `our_event`;
CREATE TABLE `our_event`  (
  `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_show` tinyint(1) NOT NULL DEFAULT 0,
  `title_locale_id` int(12) NOT NULL,
  `content_locale_id` int(12) NOT NULL,
  `version` int(12) NOT NULL,
  `create_time` datetime(0) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for our_news
-- ----------------------------
DROP TABLE IF EXISTS `our_news`;
CREATE TABLE `our_news`  (
  `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_show` tinyint(1) NOT NULL DEFAULT 0,
  `title_locale_id` int(12) NOT NULL,
  `content_locale_id` int(12) NOT NULL,
  `version` int(12) NOT NULL,
  `create_time` datetime(0) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for our_work
-- ----------------------------
DROP TABLE IF EXISTS `our_work`;
CREATE TABLE `our_work`  (
  `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_show` tinyint(1) NOT NULL DEFAULT 0,
  `title_locale_id` int(12) NOT NULL,
  `content_locale_id` int(12) NOT NULL,
  `version` int(12) NOT NULL,
  `create_time` datetime(0) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
