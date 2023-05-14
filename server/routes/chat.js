const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const chatController = require('../controllers/chat_controller');

router.get('/getUsers', fetchUser, chatController.getUsers);
router.post('/getChatRoom', fetchUser, chatController.getChatRoom);
router.post('/msgSeen', fetchUser, chatController.messageSeen);

module.exports = router;