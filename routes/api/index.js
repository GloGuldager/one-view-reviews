const router = require("express").Router();
const reviewRoutes = require("./reviews");

// Review routes
router.use("/reviews", reviewRoutes);

module.exports = router;
