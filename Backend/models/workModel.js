const db = require('../config/db');

class Work {
    static async create(work) {
        const { title, description, assigned_by, assigned_to } = work;
        const [result] = await db.execute(
            'INSERT INTO works (title, description, assigned_by, assigned_to) VALUES (?, ?, ?, ?)',
            [title, description, assigned_by, assigned_to]
        );
        return result;
    }

    static async findByAssignedTo(user_id) {
        const [rows] = await db.execute('SELECT * FROM works WHERE assigned_to = ?', [user_id]);
        return rows;
    }

    static async updateStatus(id, status) {
        const [result] = await db.execute('UPDATE works SET status = ? WHERE id = ?', [status, id]);
        return result;
    }

    static async verifyWork(id, verified_by, digital_signature) {
        const [result] = await db.execute(
            'UPDATE works SET status = "verified", verified_by = ?, digital_signature = ?, verified_at = NOW() WHERE id = ?',
            [verified_by, digital_signature, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM works WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Work;