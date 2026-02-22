// routes/hospital.routes.js
const express = require('express');
const router = express.Router();

const {
    createHospitalController,
    getAllHospitalsController,
    getHospitalBySlugController,
    getHospitalByIdController,
    updateHospitalController,
    deleteHospitalController
} = require('../controllers/hospitals.controller');

router.post('/hospitals', createHospitalController);
router.get('/hospitals', getAllHospitalsController);
router.get('/hospitals/slug/:slug', getHospitalBySlugController);
router.get('/hospitals/:id', getHospitalByIdController);
router.put('/hospitals/:id', updateHospitalController);
router.delete('/hospitals/:id', deleteHospitalController);

module.exports = router;