const pool = require('../config/db');

// ─── Helpers ────────────────────────────────────────────────────────────────

// Ensures a value is a JS array (for text[] columns)
const toArray = (val) => Array.isArray(val) ? val : [];

// Ensures jsonb columns get a valid JSON string
const toJsonb = (val) => {
    if (val === null || val === undefined) return JSON.stringify([]);
    if (typeof val === 'string') {
        try { JSON.parse(val); return val; } catch { return JSON.stringify([]); }
    }
    return JSON.stringify(val);
};

// ─── CREATE ─────────────────────────────────────────────────────────────────

const createDoctor = async (data) => {
    const {
        uuid, name, email, photo, phone,
        degrees, specialities, currently_serving, experience_in_years,
        registration_number, city, state, country, address,
        overview, serving_in_hospitals, is_active, is_verified,
        availability_schedule, consultation_fee, languages_spoken,
        awards_and_recognitions, publications, average_rating,
        total_reviews, total_patients_treated, meta_title,
        meta_description, created_at, updated_at
    } = data;

    // Duplicate email check
    const existing = await pool.query(
        'SELECT uuid FROM doctors WHERE email = $1 AND deleted_at IS NULL',
        [email]
    );
    if (existing.rows.length > 0) {
        throw new Error('A doctor with this email already exists');
    }

    const query = `
        INSERT INTO doctors (
            uuid, name, email, photo, phone,
            degrees, specialities, currently_serving, experience_in_years,
            registration_number, city, state, country, address,
            overview, serving_in_hospitals, is_active, is_verified,
            availability_schedule, consultation_fee, languages_spoken,
            awards_and_recognitions, publications, average_rating,
            total_reviews, total_patients_treated, meta_title,
            meta_description, created_at, updated_at, deleted_at
        ) VALUES (
            $1,  $2,  $3,  $4,  $5,
            $6::text[],  $7::text[],  $8,  $9,
            $10, $11, $12, $13, $14,
            $15, $16::jsonb, $17, $18,
            $19::jsonb, $20, $21::text[],
            $22::text[], $23::text[], $24,
            $25, $26, $27,
            $28, $29, $30, NULL
        )
        RETURNING *
    `;

    const values = [
        uuid,                                       // $1
        name,                                       // $2
        email,                                      // $3
        photo || null,                              // $4
        phone || null,                              // $5
        toArray(degrees),                           // $6  text[]
        toArray(specialities),                      // $7  text[]
        currently_serving || null,                  // $8
        experience_in_years || null,                // $9
        registration_number || null,                // $10
        city || null,                               // $11
        state || null,                              // $12
        country || null,                            // $13
        address || null,                            // $14
        overview || null,                           // $15
        toJsonb(serving_in_hospitals),              // $16 jsonb
        is_active ?? true,                          // $17
        is_verified ?? false,                       // $18
        toJsonb(availability_schedule),             // $19 jsonb
        consultation_fee || null,                   // $20
        toArray(languages_spoken),                  // $21 text[]
        toArray(awards_and_recognitions),           // $22 text[]
        toArray(publications),                      // $23 text[]
        average_rating || 0,                        // $24
        total_reviews || 0,                         // $25
        total_patients_treated || 0,                // $26
        meta_title || null,                         // $27
        meta_description || null,                   // $28
        created_at || new Date(),                   // $29
        updated_at || new Date()                    // $30
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// ─── READ ALL (with filters + pagination) ───────────────────────────────────

const getAllDoctors = async (filters = {}, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const conditions = ['deleted_at IS NULL'];
    const values = [];
    let p = 1;

    if (filters.city) {
        conditions.push(`city ILIKE $${p++}`);
        values.push(`%${filters.city}%`);
    }
    if (filters.specialty) {
        conditions.push(`$${p++} = ANY(specialities)`);
        values.push(filters.specialty);
    }
    if (filters.is_active !== undefined && filters.is_active !== '') {
        conditions.push(`is_active = $${p++}`);
        values.push(filters.is_active === 'true');
    }
    if (filters.is_verified !== undefined && filters.is_verified !== '') {
        conditions.push(`is_verified = $${p++}`);
        values.push(filters.is_verified === 'true');
    }

    const where = conditions.join(' AND ');

    const countResult = await pool.query(
        `SELECT COUNT(*) FROM doctors WHERE ${where}`,
        values
    );
    const total = parseInt(countResult.rows[0].count);

    const dataResult = await pool.query(
        `SELECT * FROM doctors
         WHERE ${where}
         ORDER BY created_at DESC
         LIMIT $${p++} OFFSET $${p++}`,
        [...values, limit, offset]
    );

    return {
        doctors: dataResult.rows,
        pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
    };
};

// ─── READ ONE ────────────────────────────────────────────────────────────────

const getDoctorByUuid = async (uuid) => {
    const result = await pool.query(
        'SELECT * FROM doctors WHERE uuid = $1 AND deleted_at IS NULL',
        [uuid]
    );
    return result.rows[0] || null;
};

const getDoctorById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM doctors WHERE id = $1 AND deleted_at IS NULL',
        [id]
    );
    return result.rows[0] || null;
};

// ─── UPDATE ──────────────────────────────────────────────────────────────────

const updateDoctor = async (uuid, data) => {
    const existing = await pool.query(
        'SELECT uuid FROM doctors WHERE uuid = $1 AND deleted_at IS NULL',
        [uuid]
    );
    if (existing.rows.length === 0) return null;

    // Which fields map to which PG type
    const textArrayFields = [
        'degrees', 'specialities', 'languages_spoken',
        'awards_and_recognitions', 'publications'
    ];
    const jsonbFields = ['serving_in_hospitals', 'availability_schedule'];

    const allowedFields = [
        'name', 'email', 'photo', 'phone', 'degrees', 'specialities',
        'currently_serving', 'experience_in_years', 'registration_number',
        'city', 'state', 'country', 'address', 'overview',
        'serving_in_hospitals', 'is_active', 'is_verified',
        'availability_schedule', 'consultation_fee', 'languages_spoken',
        'awards_and_recognitions', 'publications', 'average_rating',
        'total_reviews', 'total_patients_treated', 'meta_title', 'meta_description'
    ];

    const setClauses = [];
    const values = [];
    let p = 1;

    for (const field of allowedFields) {
        if (data[field] !== undefined) {
            let val = data[field];

            if (textArrayFields.includes(field)) {
                setClauses.push(`${field} = $${p++}::text[]`);
                values.push(toArray(val));
            } else if (jsonbFields.includes(field)) {
                setClauses.push(`${field} = $${p++}::jsonb`);
                values.push(toJsonb(val));
            } else {
                setClauses.push(`${field} = $${p++}`);
                values.push(val);
            }
        }
    }

    if (setClauses.length === 0) throw new Error('No valid fields to update');

    setClauses.push(`updated_at = $${p++}`);
    values.push(new Date());
    values.push(uuid);

    const result = await pool.query(
        `UPDATE doctors SET ${setClauses.join(', ')}
         WHERE uuid = $${p} AND deleted_at IS NULL
         RETURNING *`,
        values
    );
    return result.rows[0] || null;
};

// ─── SOFT DELETE ─────────────────────────────────────────────────────────────

const deleteDoctor = async (uuid) => {
    const result = await pool.query(
        `UPDATE doctors
         SET deleted_at = $1, updated_at = $1
         WHERE uuid = $2 AND deleted_at IS NULL
         RETURNING uuid`,
        [new Date(), uuid]
    );
    return result.rows[0] || null;
};

// ─── SEARCH ──────────────────────────────────────────────────────────────────

const searchDoctors = async ({ q, city, specialty, min_fee, max_fee, min_rating }) => {
    const conditions = ['deleted_at IS NULL', 'is_active = true'];
    const values = [];
    let p = 1;

    if (q) {
        conditions.push(`(name ILIKE $${p} OR overview ILIKE $${p})`);
        values.push(`%${q}%`);
        p++;
    }
    if (city) {
        conditions.push(`city ILIKE $${p++}`);
        values.push(`%${city}%`);
    }
    if (specialty) {
        conditions.push(`$${p++} = ANY(specialities)`);
        values.push(specialty);
    }
    if (min_fee) {
        conditions.push(`consultation_fee >= $${p++}`);
        values.push(parseFloat(min_fee));
    }
    if (max_fee) {
        conditions.push(`consultation_fee <= $${p++}`);
        values.push(parseFloat(max_fee));
    }
    if (min_rating) {
        conditions.push(`average_rating >= $${p++}`);
        values.push(parseFloat(min_rating));
    }

    const result = await pool.query(
        `SELECT * FROM doctors
         WHERE ${conditions.join(' AND ')}
         ORDER BY average_rating DESC, total_reviews DESC`,
        values
    );
    return result.rows;
};

// ─── TOGGLE STATUS ───────────────────────────────────────────────────────────

const toggleStatus = async (uuid, { is_active, is_verified }) => {
    const setClauses = [];
    const values = [];
    let p = 1;

    if (is_active !== undefined) {
        setClauses.push(`is_active = $${p++}`);
        values.push(is_active);
    }
    if (is_verified !== undefined) {
        setClauses.push(`is_verified = $${p++}`);
        values.push(is_verified);
    }
    if (setClauses.length === 0) throw new Error('No status fields provided');

    setClauses.push(`updated_at = $${p++}`);
    values.push(new Date());
    values.push(uuid);

    const result = await pool.query(
        `UPDATE doctors SET ${setClauses.join(', ')}
         WHERE uuid = $${p} AND deleted_at IS NULL
         RETURNING *`,
        values
    );
    return result.rows[0] || null;
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorByUuid,
    updateDoctor,
    deleteDoctor,
    searchDoctors,
    toggleStatus,
    getDoctorById,
};