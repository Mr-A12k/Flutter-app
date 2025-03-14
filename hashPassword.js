const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync('fieldworker', salt);
console.log(hashedPassword);