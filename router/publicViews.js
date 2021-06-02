const router = require('express').Router();
const path = require('path');

router.get('/about', (req, res) => res.render('about'));

module.exports = router;