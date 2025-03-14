const Department = require('../models/departmentModel');

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.getAll();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch departments', error });
    }
};

exports.getDepartmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch department', error });
    }
};

exports.createDepartment = async (req, res) => {
    const { name } = req.body;

    try {
        const result = await Department.create(name);
        res.status(201).json({ message: 'Department created successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create department', error });
    }
};

exports.updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const result = await Department.update(id, name);
        res.status(200).json({ message: 'Department updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update department', error });
    }
};

exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Department.delete(id);
        res.status(200).json({ message: 'Department deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete department', error });
    }
};