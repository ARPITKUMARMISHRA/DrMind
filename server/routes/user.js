const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const userController = require('../controllers/user_controller');

router.post('/updateGroup', fetchUser, userController.updateGroup);

module.exports = router;