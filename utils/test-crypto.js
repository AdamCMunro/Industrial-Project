require('dotenv').config();

const crypto = require('./crypto');

function testBasicStringEncryption() {
    let string = 'hello, world!';
    let cryptoInstance = new crypto();
    let encrypted = cryptoInstance.encrypt(string);
    let decrypted = cryptoInstance.decrypt(encrypted);

    console.log(`Original string: ${string}`);
    console.log(`Encrypted string: ${encrypted}`);
    console.log(`Decrypted string: ${decrypted}`);

    if (string === decrypted) {
        console.log('test passed - the string and decrypted string match.');
    } else {
        console.error('test failed - the strings do not match.');
    }
}

testBasicStringEncryption();