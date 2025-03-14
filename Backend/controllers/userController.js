const db = require('../config/db');
const bcrypt = require('bcryptjs');

class UserController {
    // Fetch all users (only accessible by master admin)
    async getAllUsers(req, res) {
        try {
            const [users] = await db.execute('SELECT * FROM users');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch users', error });
        }
    }

    // Fetch user details by ID (accessible by the user themselves or master admin)
    async getUserById(req, res) {
        const { id } = req.params;

        try {
            const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Ensure the user is accessing their own data or is a master admin
            if (req.user.id !== user[0].id && req.user.role !== 'master_admin') {
                return res.status(403).json({ message: 'Access denied' });
            }

            res.status(200).json(user[0]);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch user', error });
        }
    }

    // Update user details (accessible by the user themselves or master admin)
    async updateUser(req, res) {
        const { id } = req.params;
        const { first_name, last_name, email, mobile_number, emp_number, password } = req.body;

        try {
            const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Ensure the user is updating their own data or is a master admin
            if (req.user.id !== user[0].id && req.user.role !== 'master_admin') {
                return res.status(403).json({ message: 'Access denied' });
            }

            // Hash the password if provided
            let hashedPassword = user[0].password;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(password, salt);
            }

            const [result] = await db.execute(
                'UPDATE users SET first_name = ?, last_name = ?, email = ?, mobile_number = ?, emp_number = ?, password = ? WHERE id = ?',
                [first_name, last_name, email, mobile_number, emp_number, hashedPassword, id]
            );

            res.status(200).json({ message: 'User updated successfully', result });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update user', error });
        }
    }

    // Delete a user (only accessible by master admin)
    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Ensure the user is a master admin
            if (req.user.role !== 'master_admin') {
                return res.status(403).json({ message: 'Access denied' });
            }

            const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
            res.status(200).json({ message: 'User deleted successfully', result });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete user', error });
        }
    }
}

module.exports = new UserController();