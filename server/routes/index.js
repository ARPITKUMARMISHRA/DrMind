const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

router.use('/auth', require('./auth'));


module.exports = router;