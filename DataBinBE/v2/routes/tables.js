const express = require("express");

const {
  getTableData,
  getFullSalesData,
  getFullSalesDataTEST,
  UserLogin,
  getMinMaxValues,
  UserRegistration,
  getCustomQueryDate,
  getMapData,
  getEnterpriseKeys,
  scheduleTask,
  updateUsers,
  getAllUser,
  getTimeSeriesData,
  getCityData,
  getDataForTimeSeries,
  thresholdInfo,
  getThresholdInfo,
  sendSMS,
  deleteUser,
  getSalesAvgData,
  getUserRoleByEmail,
} = require("../controllers/tables");

const router = express.Router();

router.get("/", getTableData);
router.get("/getFullSalesData", getFullSalesData);
router.get("/getFullSalesDatatest", getFullSalesDataTEST);
router.post("/query", getCustomQueryDate);
router.post("/login", UserLogin);
router.get("/getMinMaxValues", getMinMaxValues);
router.post("/register", UserRegistration);
router.get("/map", getMapData);
router.get("/enterprise-keys", getEnterpriseKeys);
router.post("/scheduler", scheduleTask);
router.get("/users",getAllUser)
router.get("/timeSeriesData", getTimeSeriesData);
router.get("/getCityData", getCityData);
router.get("/getDataForTimeSeries", getDataForTimeSeries);
router.get("/getThresholdInfo", getThresholdInfo);
router.post("/thresholdInfo", thresholdInfo);
router.post("/sendSMS", sendSMS);
router.put("/updateUsers/:id",updateUsers);
router.delete("/deleteUser/:id",deleteUser);
router.get("/user-role",getUserRoleByEmail)
router.get("/getSalesAvgData", getSalesAvgData);

module.exports = router;
