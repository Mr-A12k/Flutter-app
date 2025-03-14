const Work = require('../models/workModel');

exports.assignWork = async (req, res) => {
    const { title, description, assigned_to } = req.body;
    const assigned_by = req.user.id;

    try {
        const work = await Work.create({ title, description, assigned_by, assigned_to });
        res.status(201).json({ message: 'Work assigned successfully', work });
    } catch (error) {
        res.status(500).json({ message: 'Failed to assign work', error });
    }
};

exports.getWorksByAssignedTo = async (req, res) => {
    const { id } = req.params;

    try {
        const works = await Work.findByAssignedTo(id);
        res.status(200).json(works);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch works', error });
    }
};

exports.updateWorkStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await Work.updateStatus(id, status);
        res.status(200).json({ message: 'Work status updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update work status', error });
    }
};

exports.verifyWork = async (req, res) => {
    const { id } = req.params;
    const { digital_signature } = req.body;
    const verified_by = req.user.id;

    try {
        const result = await Work.verifyWork(id, verified_by, digital_signature);
        res.status(200).json({ message: 'Work verified successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to verify work', error });
    }
};

exports.deleteWork = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Work.delete(id);
        res.status(200).json({ message: 'Work deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete work', error });
    }
};