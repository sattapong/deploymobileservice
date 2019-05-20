const express = require("express");
const router = express.Router();
const MasterController = require("../controllers/master");

/********************************************************************************************************/

router.get("/getBrand",MasterController.getBrand);

/********************************************************************************************************/

router.get("/getSmartphones",MasterController.getSmartphones);

/********************************************************************************************************/

router.post("/getSmartphone",MasterController.getSmartphone);

/********************************************************************************************************/
module.exports = router;
