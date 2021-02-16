const express = require('express');
const controller = require('../../controllers/authenticationController');
const auth = require('../../middlewares/authenticate').clientSecret;

const router = express.Router();

router.get('/', [auth], controller.index);
// router.get('/:id', controller.show);
router.post('/', controller.store);
/* router.put('/:id', controller.updateForce);
router.patch('/:id', controller.update); */
router.delete('/', controller.destroy);
router.head('/', controller.head);

module.exports = router;
