const router = require('express').Router();
const authController = require('../controller/auth');

router.post('/register', authController.registerPost);

module.exports = router;