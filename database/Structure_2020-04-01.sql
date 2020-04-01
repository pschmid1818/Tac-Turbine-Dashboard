
CREATE TABLE `dashboard_data` (
  `time` datetime NOT NULL,
  `voltage` decimal(15,5) DEFAULT NULL,
  `frequency` decimal(15,5) DEFAULT NULL,
  `power` decimal(15,5) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `voltAC` decimal(15,5) DEFAULT NULL,
  `currAC` decimal(15,5) DEFAULT NULL,
  `freqAC` decimal(15,5) DEFAULT NULL,
  `inverterV` decimal(15,5) DEFAULT NULL,
  `inverterI` decimal(15,5) DEFAULT NULL,
  `inverterL` decimal(15,5) DEFAULT NULL,
  `statusB` int(11) DEFAULT NULL,
  `phLossCount` decimal(15,5) DEFAULT NULL,
  `phLossVfRatio` decimal(15,5) DEFAULT NULL,
  `dataPerSec` decimal(15,5) DEFAULT NULL,
  PRIMARY KEY (`time`)
);