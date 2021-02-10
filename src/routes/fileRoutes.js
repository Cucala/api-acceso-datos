const express = require('express');
const multer = require('multer');
const controller = require('../controllers/fileController');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', upload.single('file'), controller.store);
router.put('/:id', controller.updateForce);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.head('/', controller.head);

module.exports = router;
