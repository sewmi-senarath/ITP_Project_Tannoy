const express = require("express");
const router = express.Router();

const technicalController = require("../Controlers/TechnicalController");

// Route to add employees
router.post("/api/addmachine", technicalController.addmachine);
router.post(
  "/api/createMachineCategory",
  technicalController.createMachineCategory
);
router.get("/api/getMachineCategory", technicalController.getMachineCategory);
router.get("/api/machineLabels", technicalController.getMachineLabels);

//Route get all machine
router.get("/api/getallmachine", technicalController.getallmachine);

//Route machine by machine
router.get("/api/getmachineById/:id", technicalController.getmachineById);

//Route update machine
router.put("/api/updatemachine/:_id", technicalController.updatemachine);

//Route update machine
router.delete("/api/deletemachine", technicalController.deletemachine);

module.exports = router;
