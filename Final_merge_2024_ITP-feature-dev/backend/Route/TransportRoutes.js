const express = require("express");
const router = express.Router();

const transportController = require("../Controlers/TransportController");

// Route to add employees
router.post("/api/addtransport", transportController.addtransport);
router.post("/api/createvehicletypes", transportController.createVehicletypes);
router.get(
  "/api/gettransportCategory",
  transportController.getTransportCategory
);
router.get("/api/transportLabels", transportController.getTrasportLabels);

//Route get all machine
router.get("/api/getalltransport", transportController.getalltransport);

//Route machine by machine
router.get("/api/gettransportById/:id", transportController.gettransportById);

//Route update machine
router.put("/api/updatetransport/:_id", transportController.updateTransport);

//Route update machine
router.delete("/api/deletetransport", transportController.deletTransport);

module.exports = router;
