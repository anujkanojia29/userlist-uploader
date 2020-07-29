const express = require('express');
const { LOGIN_ROUTE, LOGOUT_ROUTE, GET_DETAILS_ROUTE} = require('../../constants')
const {
  login,
  logout,
} = require('../controllers/auth');

const router = express.Router();

router.post(LOGIN_ROUTE, login);
router.get(LOGOUT_ROUTE, logout);


module.exports = router;
