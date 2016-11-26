/*
Navicat MySQL Data Transfer

Source Server         : MariaDB
Source Server Version : 100114
Source Host           : localhost:3306
Source Database       : wechat

Target Server Type    : MYSQL
Target Server Version : 100114
File Encoding         : 65001

Date: 2016-10-27 17:45:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for good
-- ----------------------------
DROP TABLE IF EXISTS `good`;
CREATE TABLE `good` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `good` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `description` varchar(255) DEFAULT NULL,
  `pic` varchar(255) NOT NULL DEFAULT '../../avatar/good.jpg',
  `stock` int(11) NOT NULL DEFAULT '0',
  `sale` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of good
-- ----------------------------
INSERT INTO `good` VALUES ('1', 'Winne The Pool', '99.00', 'Postcard', 'https://romeo.wang/pic/1.jpg', '100', '0');
INSERT INTO `good` VALUES ('2', 'Winne The Pool', '99.00', 'Bookmark', 'https://romeo.wang/pic/2.jpg', '100', '0');
INSERT INTO `good` VALUES ('3', 'Winne The Pool', '198.00', 'Bolster', 'https://romeo.wang/pic/3.jpg', '100', '0');
INSERT INTO `good` VALUES ('4', 'Winne The Pool', '198.00', 'Bolster', 'https://romeo.wang/pic/4.jpg', '100', '0');
INSERT INTO `good` VALUES ('5', 'Winne The Pool', '288.00', 'Souvenir Edition Figure', 'https://romeo.wang/pic/5.jpg', '100', '0');
INSERT INTO `good` VALUES ('6', 'Winne The Pool', '288.00', 'Souvenir Edition Figure', 'https://romeo.wang/pic/6.jpg', '100', '0');
INSERT INTO `good` VALUES ('7', 'Winne The Pool', '0.00', 'Gift DO NOT PURCHASE THIS!', '../../avatar/good.jpg', '100', '0');
INSERT INTO `good` VALUES ('8', 'Winne The Pool', '0.00', 'Gift DO NOT PURCHASE THIS!', '../../avatar/good.jpg', '100', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zijian', 'zijian');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `nickName` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT 'visitor',
  `avatarUrl` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '../../avatar/default.jpg',
  `gender` enum('0','1','2') CHARACTER SET latin1 NOT NULL DEFAULT '0',
  `province` varchar(255) CHARACTER SET latin1 DEFAULT '',
  `city` varchar(255) CHARACTER SET latin1 DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('1', '1', 'zijian', '../../avatar/default.jpg', '0', 'Beijing', '');
