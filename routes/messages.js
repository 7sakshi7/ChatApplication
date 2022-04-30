const router = require('express').Router();

const messagesController = require('../controllers/messages');

router.post('/addmsg',messagesController.addMsg);

router.post('/getmsg',messagesController.getAllMsg);

module.exports = router;