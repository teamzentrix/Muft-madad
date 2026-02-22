// services/hospital.services.js
const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

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
        location,
        about,
        opening_hours,
        timing_display,
        certifications,
        total_doctors,
        total_specialities,
        rating,
        total_reviews,
        is_verified,
        is_active,
        meta_title,
        meta_description,
        available_treatments,
        available_specialities,   // ← NEW
        available_services        // ← NEW
    } = data;

    const query = `
        INSERT INTO hospitals (
            uuid, name, photo, slug, phone, email,
            address, city, state, pincode, country, location,
            about, opening_hours, timing_display, certifications,
            total_doctors, total_specialities, rating, total_reviews,
            is_verified, is_active, meta_title, meta_description,
            available_treatments, available_specialities, available_services,
            created_at, updated_at
        )
        VALUES (
            $1,  $2,  $3,  $4,  $5,  $6,
            $7,  $8,  $9,  $10, $11, $12,
            $13, $14, $15, $16,
            $17, $18, $19, $20,
            $21, $22, $23, $24,
            $25, $26, $27,
            NOW(), NOW()
        )
        RETURNING *
    `;

    const values = [
        uuid || uuidv4(),          // $1
        name,                      // $2
        photo || null,             // $3
        slug,                      // $4
        phone,                     // $5
        email,                     // $6
        address,                   // $7
        city,                      // $8
        state,                     // $9
        pincode || null,           // $10
        country,                   // $11
        location || null,          // $12  point type
        about || null,             // $13
        JSON.stringify(opening_hours || []),  // $14 jsonb
        timing_display || null,    // $15
        certifications || [],      // $16  text[]
        total_doctors || 0,        // $17
        total_specialities || 0,   // $18
        rating || 0,               // $19
        total_reviews || 0,        // $20
        is_verified || false,      // $21
        is_active !== undefined ? is_active : true,  // $22
        meta_title || null,        // $23
        meta_description || null,  // $24
        available_treatments || [],   // $25  text[]
        available_specialities || [], // $26  text[]  ← NEW
        available_services || []      // $27  text[]  ← NEW
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const getAllHospitalsService = async () => {
    const query = `SELECT * FROM hospitals WHERE deleted_at IS NULL ORDER BY created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
};

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
        location, about, opening_hours, timing_display,
        certifications, total_doctors, total_specialities,
        rating, total_reviews, is_verified, is_active,
        meta_title, meta_description,
        available_treatments,
        available_specialities,   // ← NEW
        available_services        // ← NEW
    } = data;

    const query = `
        UPDATE hospitals SET
            name = $1,  photo = $2,  slug = $3,  phone = $4,  email = $5,
            address = $6,  city = $7,  state = $8,  pincode = $9,  country = $10,
            location = $11, about = $12, opening_hours = $13, timing_display = $14,
            certifications = $15, total_doctors = $16, total_specialities = $17,
            rating = $18, total_reviews = $19, is_verified = $20, is_active = $21,
            meta_title = $22, meta_description = $23,
            available_treatments = $24,
            available_specialities = $25,
            available_services = $26,
            updated_at = NOW()
        WHERE id = $27 AND deleted_at IS NULL
        RETURNING *
    `;

    const values = [
        name,                      // $1
        photo || null,             // $2
        slug,                      // $3
        phone,                     // $4
        email,                     // $5
        address,                   // $6
        city,                      // $7
        state,                     // $8
        pincode || null,           // $9
        country,                   // $10
        location || null,          // $11
        about || null,             // $12
        JSON.stringify(opening_hours || []),  // $13
        timing_display || null,    // $14
        certifications || [],      // $15
        total_doctors || 0,        // $16
        total_specialities || 0,   // $17
        rating || 0,               // $18
        total_reviews || 0,        // $19
        is_verified || false,      // $20
        is_active !== undefined ? is_active : true,  // $21
        meta_title || null,        // $22
        meta_description || null,  // $23
        available_treatments || [],   // $24
        available_specialities || [], // $25  ← NEW
        available_services || [],     // $26  ← NEW
        id                            // $27  ← was $25 before
    ];

    const result = await pool.query(query, values);
    return result.rows[0] || null;
};

const deleteHospitalService = async (id) => {
    const query = `
        UPDATE hospitals SET deleted_at = NOW() WHERE id = $1 RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

module.exports = {
    createHospitalService,
    getAllHospitalsService,
    getHospitalBySlugService,
    getHospitalByIdService,
    updateHospitalService,
    deleteHospitalService
};