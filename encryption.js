const CryptoJS = require("crypto-js");

const secretKey = "51c66db150d59be4193bc69a0bbe0ce696e61fb1ed1080ea1cc7df6d07645cba"; // Use a strong key and store securely

// Function to encrypt data
function encryptData(data) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

// Function to decrypt data
function decryptData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Export functions
module.exports = {
    encryptData,
    decryptData,
};
