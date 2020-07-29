const express = require('express');
const { download } = require('../controllers/download');
const { DOWNLOAD_ROUTE } = require('../../constants');

const router = express.Router();

router.get( DOWNLOAD_ROUTE , download);

module.exports = router;
