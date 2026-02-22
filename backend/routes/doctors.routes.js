const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors.controller');

router.post('/', doctorsController.createDoctor);
router.get('/', doctorsController.getAllDoctors);
router.get('/id/:id', doctorsController.getDoctorById);
router.get('/:uuid', doctorsController.getDoctorByUuid);
router.put('/:uuid', doctorsController.updateDoctor);
router.delete('/:uuid', doctorsController.deleteDoctor);
router.patch('/:uuid/status', doctorsController.toggleStatus);

module.exports = router;