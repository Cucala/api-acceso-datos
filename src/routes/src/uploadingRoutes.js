const express = require('express');
const multer = require('multer');
const controller = require('../../controllers/uploadingController');
const auth = require('../../middlewares/authenticate').clientSecret;

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/', [auth], controller.index);
router.get('/:id', [auth], controller.show);
router.post('/', [auth], upload.single('file'), controller.store);
router.put('/:id', [auth], controller.updateForce);
router.patch('/:id', [auth], controller.update);
router.delete('/:id', [auth], controller.destroy);
router.head('/', controller.head);

module.exports = router;
