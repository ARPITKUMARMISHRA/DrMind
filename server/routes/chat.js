const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const chatController = require('../controllers/chat_controller');

router.get('/getRooms', fetchUser, chatController.getRooms);
router.post('/sendMessage', fetchUser, chatController.sendMessage);
router.get('/getChats', fetchUser, chatController.getChats);
router.post('/deleteRoom', fetchUser, chatController.deleteRoom);

module.exports = router;