const crypto = require('crypto');

const generateUID = () => {
    return crypto.randomBytes(4).toString('HEX');
}

module.exports = generateUID;