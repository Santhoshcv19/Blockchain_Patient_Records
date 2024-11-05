const HealthRecords = artifacts.require("HealthRecords");
const { encryptData, decryptData } = require("../encryption");

contract("HealthRecords", (accounts) => {
    let instance;
    const publicData = "Vaccination Status: Up to date";
    const sensitiveData = "Sensitive medical history";
    const encryptedData = encryptData(sensitiveData);
    const doctorAddress = accounts[1]; // Use the second account as the doctor

    before(async () => {
        instance = await HealthRecords.new();
        await instance.createRecord(publicData, encryptedData, doctorAddress, true);
    });

    it("should retrieve the public data and encrypted private data", async () => {
        const record = await instance.records(0);
        assert.equal(record.publicData, publicData, "Public data does not match");
        assert.equal(record.encryptedData, encryptedData, "Encrypted data does not match");
    });

    it("should decrypt the private data correctly", async () => {
        const decryptedData = decryptData(encryptedData);
        assert.equal(decryptedData, sensitiveData, "Decrypted data does not match original");
    });
});
