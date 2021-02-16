const express = require('express');
const controller = require('../../controllers/bookTypeController');
const auth = require('../../middlewares/authenticate').clientSecret;

const router = express.Router();

router.get('/', [auth], controller.index);
router.get('/:id', [auth], controller.show);
router.post('/', [auth], controller.store);
router.put('/:id', [auth], controller.updateForce);
router.patch('/:id', [auth], controller.update);
router.delete('/:id', [auth], controller.destroy);
router.head('/', controller.head);

module.exports = router;
