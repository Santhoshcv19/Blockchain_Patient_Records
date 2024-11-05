// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HealthRecords {
    struct Record {
        string publicData;
        string encryptedData;
        address patient;
        address doctor;
        bool isPrivate; // This flag is still useful for managing access to encrypted data.
    }

    mapping(uint256 => Record) public records;
    uint256 public recordCount;

    event RecordCreated(uint256 indexed recordId, address indexed patient, address indexed doctor);

    constructor() {
        recordCount = 0;
    }

    // Function to create a new record
    function createRecord(
        string memory _publicData,
        string memory _encryptedData,
        address _doctor,
        bool _isPrivate
    ) public {
        uint256 newRecordId = recordCount;
        records[newRecordId] = Record({
            publicData: _publicData,
            encryptedData: _encryptedData,
            patient: msg.sender,
            doctor: _doctor,
            isPrivate: _isPrivate
        });
        recordCount++;
        emit RecordCreated(newRecordId, msg.sender, _doctor);
    }

    // Function to retrieve public data (accessible to everyone)
    function getPublicData(uint256 _recordId) public view returns (string memory) {
        require(_recordId < recordCount, "Record does not exist");
        Record storage record = records[_recordId];
        return record.publicData; // Public data can be accessed by anyone
    }

    // Function to retrieve encrypted data (only accessible to authorized individuals)
    function getEncryptedData(uint256 _recordId) public view returns (string memory) {
        require(_recordId < recordCount, "Record does not exist");
        Record storage record = records[_recordId];

        // Only the patient or the doctor can view the encrypted data
        require(
            msg.sender == record.patient || msg.sender == record.doctor,
            "Not authorized to view encrypted data"
        );
        return record.encryptedData;
    }
}
