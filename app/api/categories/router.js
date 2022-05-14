const router = require('express').Router();
const { accessRoute, ROLE } = require('../../middlewares');
const controller = require('./controller');

router.use(accessRoute({ accessRole: ROLE.KASIR }));

router.post('/', controller.createCategory);
router.get('/', controller.getAllCategories);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

module.exports = router;
