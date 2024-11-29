const express = require('express');
const { addApplicant, getApplicants, deleteApplicant } = require('../controllers/applicantController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.fields([{ name: 'photo' }, { name: 'signature' }]), addApplicant);
router.get('/', getApplicants);
router.delete('/:id', deleteApplicant);

module.exports = router;
