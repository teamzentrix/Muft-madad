const router = require('express').Router();

const { createTreatmentController, getAllTreatmentController, getTreatmentBySpecialtyIdController } = require('../controllers/treatment.controller')




router.post('/create', createTreatmentController);
router.get('/getAll', getAllTreatmentController);
router.get('/getBySpecialty/:specialty_id', getTreatmentBySpecialtyIdController);

module.exports = router;


