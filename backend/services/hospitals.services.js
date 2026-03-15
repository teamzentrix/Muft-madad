// services/hospital.services.js
const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// ─── Helper: convert location to PostgreSQL point literal ────────────────────
// Accepts: null | { lat, lng } | { x, y } | "lat,lng" string
const toPoint = (location) => {
    if (!location) return null;
    if (typeof location === 'string') {
        // already a "lat,lng" string
        const parts = location.split(',').map(Number);
        if (parts.length === 2 && !parts.some(isNaN)) return `(${parts[0]},${parts[1]})`;
        return null;
    }
    if (typeof location === 'object') {
        const lat = location.lat ?? location.x ?? null;
        const lng = location.lng ?? location.y ?? null;
        if (lat !== null && lng !== null) return `(${lat},${lng})`;
    }
    return null;
};

const createHospitalService = async (data) => {
    const {
        uuid,
        name,
        photo,
        slug,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        country,
        location,       // point column — needs special handling
        about,
        timing_display,
        certifications,
        available_specialities,
        available_services,
        gallery_images,
        total_doctors,
        total_specialities,
        is_verified,
        is_active,
        meta_title,
        meta_description,
    } = data;

    const pointValue = toPoint(location); // null or "(lat,lng)" string

    const query = `
        INSERT INTO hospitals (
            uuid, name, photo, slug, phone, email,
            address, city, state, pincode, country, location,
            about, timing_display, certifications,
            available_specialities, available_services, gallery_images,
            total_doctors, total_specialities,
            is_verified, is_active, meta_title, meta_description,
            created_at, updated_at
        )
        VALUES (
            $1,  $2,  $3,  $4,  $5,  $6,
            $7,  $8,  $9,  $10, $11,
            ${pointValue ? `point($12)` : `$12`},
            $13, $14, $15,
            $16, $17, $18,
            $19, $20,
            $21, $22, $23, $24,
            NOW(), NOW()
        )
        RETURNING *
    `;

    const values = [
        uuid || uuidv4(),                              // $1
        name,                                          // $2
        photo || null,                                 // $3
        slug,                                          // $4
        phone,                                         // $5
        email,                                         // $6
        address,                                       // $7
        city,                                          // $8
        state,                                         // $9
        pincode || null,                               // $10
        country,                                       // $11
        pointValue,                                    // $12 — null or "(lat,lng)"
        about || null,                                 // $13
        timing_display || null,                        // $14
        certifications || [],                          // $15  text[]
        available_specialities || [],                  // $16  text[]
        available_services || [],                      // $17  text[]
        gallery_images || [],                          // $18  text[]
        total_doctors || 0,                            // $19
        total_specialities || 0,                       // $20
        is_verified || false,                          // $21
        is_active !== undefined ? is_active : true,    // $22
        meta_title || null,                            // $23
        meta_description || null,                      // $24
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const getAllHospitalsService = async () => {
    const query = `SELECT * FROM hospitals WHERE deleted_at IS NULL ORDER BY created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
};

// ADD this new function to your existing hospital.services.js
// Place it after getAllHospitalsService

const getHospitalsBySpecialityService = async (specialityName) => {
    const query = `
        SELECT * FROM hospitals
        WHERE deleted_at IS NULL
          AND is_active = true
          AND $1 = ANY(available_specialities)
        ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [specialityName]);
    return result.rows;
};

// Also add it to module.exports:
// getHospitalsBySpecialityService,

const getHospitalBySlugService = async (slug) => {
    const query = `SELECT * FROM hospitals WHERE slug = $1 AND deleted_at IS NULL`;
    const result = await pool.query(query, [slug]);
    return result.rows[0] || null;
};

const getHospitalByIdService = async (id) => {
    const query = `SELECT * FROM hospitals WHERE id = $1 AND deleted_at IS NULL`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

const updateHospitalService = async (id, data) => {
    const {
        name, photo, slug, phone, email,
        address, city, state, pincode, country,
        location, about, timing_display,
        certifications, total_doctors, total_specialities,
        is_verified, is_active,
        meta_title, meta_description,
        available_specialities,
        available_services,
        gallery_images,
    } = data;

    const pointValue = toPoint(location);

    const query = `
        UPDATE hospitals SET
            name = $1,  photo = $2,  slug = $3,  phone = $4,  email = $5,
            address = $6,  city = $7,  state = $8,  pincode = $9,  country = $10,
            location = ${pointValue ? `point($11)` : `$11`},
            about = $12, timing_display = $13,
            certifications = $14, total_doctors = $15, total_specialities = $16,
            is_verified = $17, is_active = $18,
            meta_title = $19, meta_description = $20,
            available_specialities = $21,
            available_services = $22,
            gallery_images = $23,
            updated_at = NOW()
        WHERE id = $24 AND deleted_at IS NULL
        RETURNING *
    `;

    const values = [
        name,
        photo || null,
        slug,
        phone,
        email,
        address,
        city,
        state,
        pincode || null,
        country,
        pointValue,                                        // $11
        about || null,                                     // $12
        timing_display || null,                            // $13
        certifications || [],                              // $14
        total_doctors || 0,                                // $15
        total_specialities || 0,                           // $16
        is_verified || false,                              // $17
        is_active !== undefined ? is_active : true,        // $18
        meta_title || null,                                // $19
        meta_description || null,                          // $20
        available_specialities || [],                      // $21
        available_services || [],                          // $22
        gallery_images || [],                              // $23
        id                                                 // $24
    ];

    const result = await pool.query(query, values);
    return result.rows[0] || null;
};

const addGalleryImagesService = async (id, newImages) => {
    const query = `
        UPDATE hospitals
        SET gallery_images = gallery_images || $1::text[],
            updated_at = NOW()
        WHERE id = $2 AND deleted_at IS NULL
        RETURNING gallery_images
    `;
    const result = await pool.query(query, [newImages, id]);
    return result.rows[0] || null;
};

const removeGalleryImageService = async (id, imageUrl) => {
    const query = `
        UPDATE hospitals
        SET gallery_images = array_remove(gallery_images, $1::text),
            updated_at = NOW()
        WHERE id = $2 AND deleted_at IS NULL
        RETURNING gallery_images
    `;
    const result = await pool.query(query, [imageUrl, id]);
    return result.rows[0] || null;
};

const getGalleryImagesService = async (id) => {
    const query = `SELECT gallery_images FROM hospitals WHERE id = $1 AND deleted_at IS NULL`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

const deleteHospitalService = async (id) => {
    const query = `UPDATE hospitals SET deleted_at = NOW() WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

module.exports = {
    createHospitalService,
    getAllHospitalsService,
    getHospitalBySlugService,
    getHospitalByIdService,
    updateHospitalService,
    deleteHospitalService,
    addGalleryImagesService,
    removeGalleryImageService,
    getGalleryImagesService,
    getHospitalsBySpecialityService,
};