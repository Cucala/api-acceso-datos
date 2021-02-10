const express = require('express');
const controller = require('../controllers/bookTypeController');

const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.store);
router.put('/:id', controller.updateForce);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.head('/', controller.head);

module.exports = router;
