// routes/hospital.routes.js
const express = require('express');
const router = express.Router();

const {
    createHospitalController,
    getAllHospitalsController,
    getHospitalBySlugController,
    getHospitalByIdController,
    updateHospitalController,
    deleteHospitalController,
    getGalleryController,
    addGalleryController,
    removeGalleryImageController,
} = require('../controllers/hospitals.controller');

// ── Core CRUD ──────────────────────────────────────────
router.post('/', createHospitalController);
router.get('/', getAllHospitalsController);
router.get('/slug/:slug', getHospitalBySlugController);
router.get('/:id', getHospitalByIdController);
router.put('/:id', updateHospitalController);
router.delete('/:id', deleteHospitalController);

// ── Gallery ────────────────────────────────────────────
router.get('/:id/gallery', getGalleryController);       // fetch all gallery images
router.post('/:id/gallery', addGalleryController);       // add images (append)
router.delete('/:id/gallery', removeGalleryImageController); // remove one image by URL

module.exports = router;