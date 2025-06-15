//import pool from "../../../db.js";
import { executeQuery } from "../utils/dbHandler.js";
import ContractorAndConsultantQueries from "../quieries/contractorAndConsultantQueries.js";
import { validationResult } from "express-validator";

// Contractor Controllers
const addContractor = async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).json({ errors: validationResult(req).array() });

    const contractorData = [
        req.body.name, req.body.cls, req.body.license_no, req.body.tin_no, req.body.origin_country,
        req.body.address_region, req.body.address_city, req.body.address_subcity, req.body.address_woreda,
        req.body.address_house_no, req.body.contact_person_name, req.body.telephone, req.body.email,
        req.body.description
    ];

    await executeQuery(res, ContractorAndConsultantQueries.addContractor, contractorData, "Contractor added successfully");
};

const updateContractor = async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).json({ errors: validationResult(req).array() });

    const contractorData = [
        req.body.name, req.body.cls, req.body.license_no, req.body.tin_no, req.body.origin_country,
        req.body.address_region, req.body.address_city, req.body.address_subcity, req.body.address_woreda,
        req.body.address_house_no, req.body.contact_person_name, req.body.telephone, req.body.email,
        req.body.description, req.body.id
    ];

    await executeQuery(res, ContractorAndConsultantQueries.updateContractor, contractorData, "Contractor updated successfully", "Contractor not found");
};

const deleteContractor = async (req, res) => {
    await executeQuery(res, ContractorAndConsultantQueries.deleteContractor, [req.params.id], "Contractor deleted successfully", "Contractor not found");
};

const getContractorById = async (req, res) => {
    await executeQuery(res, ContractorAndConsultantQueries.getContractorById, [req.params.id], null, "Contractor not found");
};

const getAllContractors = async (req, res) => {
    await executeQuery(res, ContractorAndConsultantQueries.getAllContractors);
};

// Consultant Controllers
const addConsultant = async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).json({ errors: validationResult(req).array() });

    const consultantData = [
        req.body.name, req.body.cls, req.body.license_no, req.body.tin_no, req.body.origin_country,
        req.body.address_region, req.body.address_city, req.body.address_subcity, req.body.address_woreda,
        req.body.address_house_no, req.body.contact_person_name, req.body.telephone, req.body.email,
        req.body.description
    ];

    await executeQuery(res, ContractorAndConsultantQueries.addConsultant, consultantData, "Consultant added successfully");
};

const updateConsultant = async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).json({ errors: validationResult(req).array() });

    const consultantData = [
        req.body.name, req.body.cls, req.body.license_no, req.body.tin_no, req.body.origin_country,
        req.body.address_region, req.body.address_city, req.body.address_subcity, req.body.address_woreda,
        req.body.address_house_no, req.body.contact_person_name, req.body.telephone, req.body.email,
        req.body.description, req.body.id
    ];

    await executeQuery(res, ContractorAndConsultantQueries.updateConsultant, consultantData, "Consultant updated successfully", "Consultant not found");
};

const deleteConsultant = async (req, res) => {
    await executeQuery(res, ContractorAndConsultantQueries.deleteConsultant, [req.params.id], "Consultant deleted successfully", "Consultant not found");
};

const getConsultantById = async (req, res) => {
    await executeQuery(res, ContractorAndConsultantQueries.getConsultantById, [req.params.id], null, "Consultant not found");
};

const getAllConsultants = async (req, res) => {
    await executeQuery(res, ContractorAndConsultantQueries.getAllConsultants);
};

export default {
    addContractor,
    updateContractor,
    deleteContractor,
    getContractorById,
    getAllContractors,
    addConsultant,
    updateConsultant,
    deleteConsultant,
    getConsultantById,
    getAllConsultants,
};
/**
 * // Helper function to handle database queries
const executeQuery = async (res, query, params, successMessage, notFoundMessage = null) => {
    try {
        const result = await pool.query(query, params);

        if (notFoundMessage && result.rowCount === 0) {
            return res.status(404).json({ message: notFoundMessage });
        }

        if (successMessage) {
            return res.status(201).json({ message: successMessage, id: result.rows[0]?.id });
        }

        res.json(result.rows || { message: successMessage });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
 */