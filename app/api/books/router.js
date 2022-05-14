const router = require('express').Router();
const controller = require('./controller');
const { accessRoute, ROLE, multer } = require('../../middlewares');

router.use(accessRoute({ accessRole: ROLE.KASIR }));

router.post('/', multer.single('image'), controller.createBook);
router.get('/', controller.getAllBooks);
router.put('/:id', multer.single('image'), controller.updateBookById);
router.delete('/:id', controller.destroyBookById);

module.exports = router;
