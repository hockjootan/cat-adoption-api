const express = require("express");
const router = express.Router();
const catController = require("../controllers/catController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", catController.getAllCats);
router.get("/:id", catController.getCatById);
router.post("/", adminMiddleware, catController.createCat);
router.put("/:id", adminMiddleware, catController.updateCat);
router.delete("/:id", adminMiddleware, catController.deleteCat);

module.exports = router;
