const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createTreatmentService = async (treatmentData) => {
  const treatmentuuid = uuidv4();

  const {
    name,
    slug,
    specialty_id,
    treatment_image,
    png_logo,
    overview_description,
    key_benefits,
    who_gets_description,
    ideal_candidates,
    not_suitable_for,
    causes_description,
    causes_list,
    symptoms_description,
    symptoms_list,
    diagnosis_description,
    diagnosis_steps,
    treatment_procedure_description,
    pre_operative_steps,
    surgical_procedure_steps,
    post_operative_steps,
    cost_description,
    cost_ranges,
    cost_factors,
    ayushman_covered,
    ayushman_description,
    ayushman_benefits,
    ayushman_eligibility,
    ayushman_claim_steps,
    surgery_duration,
    hospital_stay,
    recovery_time,
    success_rate,
    faqs,
    comes_in
  } = treatmentData;


  const query = `
    INSERT INTO treatments (
      uuid,
      name,
      slug,
      specialty_id,
      treatment_image,
      png_logo,
      overview_description,
      key_benefits,
      who_gets_description,
      ideal_candidates,
      not_suitable_for,
      causes_description,
      causes_list,
      symptoms_description,
      symptoms_list,
      diagnosis_description,
      diagnosis_steps,
      treatment_procedure_description,
      pre_operative_steps,
      surgical_procedure_steps,
      post_operative_steps,
      cost_description,
      cost_ranges,
      cost_factors,
      ayushman_covered,
      ayushman_description,
      ayushman_benefits,
      ayushman_eligibility,
      ayushman_claim_steps,
      surgery_duration,
      hospital_stay,
      recovery_time,
      success_rate,
      faqs,
      comes_in,
      created_at,
      updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
      $31, $32, $33, $34, $35, NOW(), NOW()
    ) RETURNING *;
  `;

  const values = [
    treatmentuuid,
    name,
    slug,
    specialty_id,
    treatment_image,
    png_logo,
    overview_description,
    key_benefits,                        // TEXT[] — raw array
    who_gets_description,
    ideal_candidates,                    // TEXT[] — raw array
    not_suitable_for,                    // TEXT[] — raw array
    causes_description,
    JSON.stringify(causes_list),         // JSONB — array of objects
    symptoms_description,
    JSON.stringify(symptoms_list),       // JSONB — array of objects
    diagnosis_description,
    JSON.stringify(diagnosis_steps),     // JSONB — array of objects
    treatment_procedure_description,
    pre_operative_steps,                 // TEXT[] — raw array
    surgical_procedure_steps,            // TEXT[] — raw array
    post_operative_steps,                // TEXT[] — raw array
    cost_description,
    JSON.stringify(cost_ranges),         // JSONB — array of objects
    cost_factors,                        // TEXT[] — raw array
    ayushman_covered,
    ayushman_description,
    ayushman_benefits,                   // TEXT[] — raw array
    ayushman_eligibility,                // TEXT[] — raw array
    ayushman_claim_steps,                // TEXT[] — raw array
    surgery_duration,
    hospital_stay,
    recovery_time,
    success_rate,
    JSON.stringify(faqs),                // JSONB — array of objects
    comes_in ?? null
  ];

  const result = await pool.query(query, values);
  return result.rows;
}

const getAllTreatmentService = async () => {
  const query = `SELECT * FROM treatments;`;
  const result = await pool.query(query);
  return result.rows;
}

const getTreatmentBySpecialtyIdService = async (specialty_id) => {
  const query = `SELECT * FROM treatments WHERE specialty_id = $1;`;
  const result = await pool.query(query, [specialty_id]);
  if (result.rows.length === 0) {
    throw new Error('Treatment not found');
  }
  return result.rows[0]; // ✅ return object, not array
};

module.exports = { createTreatmentService, getAllTreatmentService, getTreatmentBySpecialtyIdService }