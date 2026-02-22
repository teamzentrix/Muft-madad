// controllers/hospital.controller.js
const {
    createHospitalService,
    getAllHospitalsService,
    getHospitalBySlugService,
    getHospitalByIdService,
    updateHospitalService,
    deleteHospitalService
} = require('../services/hospitals.services');

const createHospitalController = async (req, res) => {
    try {
        const { name, slug, phone, email, address, city, state, country } = req.body;

        if (!name || !slug || !phone || !email || !address || !city || !state || !country) {
            return res.status(400).json({
                message: 'name, slug, phone, email, address, city, state, and country are required'
            });
        }

        const hospital = await createHospitalService(req.body);

        return res.status(201).json({
            message: 'Hospital created successfully',
            data: hospital
        });

    } catch (error) {
        console.error('Create hospital error:', error);

        // Handle unique constraint violation (duplicate slug/email)
        if (error.code === '23505') {
            return res.status(409).json({
                message: 'A hospital with this slug or email already exists'
            });
        }

        return res.status(500).json({ message: 'Failed to create hospital' });
    }
};

const getAllHospitalsController = async (req, res) => {
    try {
        const hospitals = await getAllHospitalsService();
        return res.status(200).json({
            count: hospitals.length,
            data: hospitals
        });
    } catch (error) {
        console.error('Get hospitals error:', error);
        return res.status(500).json({ message: 'Failed to fetch hospitals' });
    }
};

const getHospitalBySlugController = async (req, res) => {
    try {
        const { slug } = req.params;
        const hospital = await getHospitalBySlugService(slug);

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        return res.status(200).json({ data: hospital });

    } catch (error) {
        console.error('Get hospital by slug error:', error);
        return res.status(500).json({ message: 'Failed to fetch hospital' });
    }
};

const getHospitalByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const hospital = await getHospitalByIdService(id);

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        return res.status(200).json({ data: hospital });

    } catch (error) {
        console.error('Get hospital by id error:', error);
        return res.status(500).json({ message: 'Failed to fetch hospital' });
    }
};

const updateHospitalController = async (req, res) => {
    try {
        const { id } = req.params;
        const hospital = await updateHospitalService(id, req.body);

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        return res.status(200).json({
            message: 'Hospital updated successfully',
            data: hospital
        });

    } catch (error) {
        console.error('Update hospital error:', error);
        return res.status(500).json({ message: 'Failed to update hospital' });
    }
};

const deleteHospitalController = async (req, res) => {
    try {
        const { id } = req.params;
        const hospital = await deleteHospitalService(id);

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        return res.status(200).json({ message: 'Hospital deleted successfully' });

    } catch (error) {
        console.error('Delete hospital error:', error);
        return res.status(500).json({ message: 'Failed to delete hospital' });
    }
};

module.exports = {
    createHospitalController,
    getAllHospitalsController,
    getHospitalBySlugController,
    getHospitalByIdController,
    updateHospitalController,
    deleteHospitalController
};