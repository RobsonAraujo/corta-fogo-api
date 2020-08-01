const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    generateBcryptHash(password) {
        return bcrypt.hash(password, saltRounds);
    },

    compareBcryptPassword(password, passwordHash) {
        return bcrypt.compare(password, passwordHash)
    }

}
