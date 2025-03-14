exports.isMasterAdmin = (req, res, next) => {
    if (req.user.role !== 'master_admin') {
        return res.status(403).json({ message: 'Access denied. Master admin only.' });
    }
    next();
};

exports.isLevel1Admin = (req, res, next) => {
    if (req.user.role !== 'level1_admin') {
        return res.status(403).json({ message: 'Access denied. Level 1 admin only.' });
    }
    next();
};

exports.isLevel2Admin = (req, res, next) => {
    if (req.user.role !== 'level2_admin') {
        return res.status(403).json({ message: 'Access denied. Level 2 admin only.' });
    }
    next();
};

exports.isSupervisor = (req, res, next) => {
    if (req.user.role !== 'supervisor') {
        return res.status(403).json({ message: 'Access denied. Supervisor only.' });
    }
    next();
};

exports.isFieldWorker = (req, res, next) => {
    if (req.user.role !== 'field_worker') {
        return res.status(403).json({ message: 'Access denied. Field worker only.' });
    }
    next();
};