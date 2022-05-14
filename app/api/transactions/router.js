const router = require('express').Router();
const { accessRoute, ROLE } = require('../../middlewares');
const controller = require('./controller');

router.use(accessRoute({ accessRole: ROLE.KASIR }));

router.post('/', controller.checkout);
router.get('/', controller.getListTransactions);
router.get('/:transactionId', controller.getTransactionById);

module.exports = router;
