const router = require("express").Router();
const scrapeRoutes = require("./scrape");

// Scrape routes
router.use("/scrape", scrapeRoutes);

module.exports = router;
