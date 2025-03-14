const db = require('../config/db');

class User {
    static async create(user) {
        const { first_name, last_name, email, mobile_number, emp_number, password, role, department_id, supervisor_id } = user;
        const [result] = await db.execute(
            'INSERT INTO users (first_name, last_name, email, mobile_number, emp_number, password, role, department_id, supervisor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, mobile_number, emp_number, password, role, department_id, supervisor_id]
        );
        return result;
    }

    static async findByMobileNumber(mobile_number) {
        const [rows] = await db.execute('SELECT * FROM users WHERE mobile_number = ?', [mobile_number]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async exists(mobile_number) {
        const [rows] = await db.execute('SELECT COUNT(*) AS count FROM users WHERE mobile_number = ?', [mobile_number]);
        return rows[0].count > 0;
    }
}

module.exports = User;