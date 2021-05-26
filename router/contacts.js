const router = require('express').Router();
const contactsC = require('../controller/contacts');
const testMid = require('../middleware/test');
const logMid = require('../middleware/log');
const auth = require('../middleware/auth');

router.post('/new', auth.checkAuth, logMid.logger, testMid.test, contactsC.newContact);
router.get('/all', auth.checkAuth, logMid.logger, contactsC.getAll);
router.delete('/:contactId', auth.checkAuth, logMid.logger, contactsC.deleteContact);
router.post('/update', auth.checkAuth, logMid.logger, contactsC.updateContact);

module.exports = router;