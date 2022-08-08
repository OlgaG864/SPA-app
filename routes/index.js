var express = require("express");
var router = express.Router();
const costumer = require("../controllers/customers");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/costumers", function (req, res, next) {
  costumer.getAllcustomers(req, res);
});
router.post("/", function (req, res, next) {
  costumer.addCustomer(req, res);
});
router.delete("/:id", function (req, res, next) {
  costumer.deleteCustomers(req, res);
});

module.exports = router;