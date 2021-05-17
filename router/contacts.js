const router = require('express').Router();
const contactsC = require('../controller/contacts');
const testMid = require('../middleware/test');

router.post('/new', testMid.test, contactsC.newContact);
router.get('/all', contactsC.getAll);
router.delete('/:contactId', contactsC.deleteContact);
router.post('/update', contactsC.updateContact);

module.exports = router;