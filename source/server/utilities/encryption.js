'use strict';

let crypto = require('crypto');

module.exports = {
    generateSalt: function () {
        return crypto.randomBytes(128).toString('base64');
    },
    generateHashedPassword: function (salt, pwd) {
        let hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    },
    encrypt: function (data, key) {
        let cipher = crypto.createCipher('aes192', key);
        let encryptedData = cipher.update(data, 'binary', 'hex');
        return (encryptedData + cipher.final("hex"));
    },
    decrypt: function (data, key) {
        let decipher = crypto.createDecipher("aes192", key);
        let decryptedData = decipher.update(data, "hex", "binary");
        return (decryptedData + decipher.final("binary"));
    },
    generateRandomText: function(size){
        size = size || 10;
        return crypto.randomBytes(size).toString('hex');
    }
};
