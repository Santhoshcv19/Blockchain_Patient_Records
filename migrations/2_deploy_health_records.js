const HealthRecords = artifacts.require("HealthRecords");
const { encryptData } = require("../encryption"); // Import the encryption functions

module.exports = async function (deployer) {
    await deployer.deploy(HealthRecords);
    const instance = await HealthRecords.deployed();

    const publicData = "Vaccination Status: Up to date";
    const sensitiveData = "Sensitive medical history"; // This is your private data
    const encryptedData = encryptData(sensitiveData); // Encrypt the private data
    const doctorAddress = "0xb65EF3e8ac1a874612f311c3E2F1429D2594C3a5"; // Replace with actual doctor's address

    await instance.createRecord(publicData, encryptedData, doctorAddress, true);
};
