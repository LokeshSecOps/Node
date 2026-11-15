const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleGetWebsite } = require("../controllers/url")
const router = express.Router();


router.post('/',handleGenerateNewShortURL)
router.get('/:shortID',handleGetWebsite)
router.get('/analytics/:shortID',handleGetAnalytics)

module.exports = router