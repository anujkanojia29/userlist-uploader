const express = require('express');
const {
  uploadUsers,
  getDetails,
  getUploads,
} = require('../controllers/user');

const {
    UPLOAD_USERS_ROUTE,
    GET_UPLOADS_ROUTE,
    GET_DETAILS_ROUTE
  } = require('../../constants');


const { protect } = require('../middleware/auth');
const { encryptPassword } = require('../middleware/encryptPassword');

const router = express.Router();

//router.use(protect);

router.post(UPLOAD_USERS_ROUTE , protect, encryptPassword, uploadUsers);
router.get( GET_UPLOADS_ROUTE , protect, getUploads);
router.get( GET_DETAILS_ROUTE , protect, getDetails);


module.exports = router;
