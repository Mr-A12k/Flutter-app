const db = require('../config/db');

class Department {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM departments');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM departments WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(name) {
        const [result] = await db.execute('INSERT INTO departments (name) VALUES (?)', [name]);
        return result;
    }

    static async update(id, name) {
        const [result] = await db.execute('UPDATE departments SET name = ? WHERE id = ?', [name, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM departments WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Department;