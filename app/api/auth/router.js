const router = require('express').Router();
const controller = require('./controller');

router.post('/sign-in', controller.signin);
router.post('/sign-up', controller.signup);

module.exports = router;
