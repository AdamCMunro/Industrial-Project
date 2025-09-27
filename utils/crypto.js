const crypto = require('crypto-js');


// this was used as a resource for implementing AES encryption and decryption
// https://dev.to/shubhamkhan/beginners-guide-to-aes-encryption-and-decryption-in-javascript-using-cryptojs-592

class Crypto {
    constructor() {
        this.key = process.env.ENCRYPTION_KEY
    }

    // takes a string and returns the encrypted string in base64 format
    encrypt(text) {
        // generate random 16 bytes iv
        const iv = crypto.lib.WordArray.random(16);

        // encrypt the text
        const encrypted = crypto.AES.encrypt(
            text,
            crypto.enc.Hex.parse(this.key),
            {
                iv: iv,
                padding: crypto.pad.Pkcs7,
                mode: crypto.mode.CBC
            }
        )

        // combine iv and encrypted text
        const encryptedBase64 = crypto.enc.Base64.stringify(
            iv.concat(encrypted.ciphertext)
        );

        return encryptedBase64;
    }

    // takes an encrypted string in base64 format and returns the decrypted string
    decrypt(encryptedText) {
        // extract iv and encrypted text
        const encryptedHexStr = crypto.enc.Base64.parse(encryptedText);
        const iv = crypto.lib.WordArray.create(
            encryptedHexStr.words.slice(0, 4)
        );
        const ciphertext = crypto.lib.WordArray.create(
            encryptedHexStr.words.slice(4),
            encryptedHexStr.sigBytes - 16
        );

        // decrypt the text
        const decrypted = crypto.AES.decrypt(
            { ciphertext: ciphertext },
            crypto.enc.Hex.parse(this.key),
            {
                iv: iv,
                padding: crypto.pad.Pkcs7,
                mode: crypto.mode.CBC
            }
        );

        // convert decrypted text to utf8
        return decrypted.toString(crypto.enc.Utf8);
    }
}

module.exports = Crypto;