# Patient Records Blockchain Project

## Project Overview
This project is a decentralized application (DApp) for securely storing and accessing health records on the blockchain using Solidity. The contract manages public and encrypted patient data, ensuring that only authorized individuals can access sensitive information.

## Features
- **Create Health Records**: Patients can create health records with public and encrypted data.
- **Access Public Data**: Anyone can access public data of a record.
- **Access Encrypted Data**: Only authorized individuals (patient and doctor) can access encrypted data.

## Prerequisites
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 12 or higher recommended)
- [Truffle](https://www.trufflesuite.com/truffle) (version 5.0 or higher)
- [Ganache](https://trufflesuite.com/ganache/) (for local blockchain testing)

## Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone [<repository-url>](https://github.com/Santhoshcv19/Blockchain_Patient_Records.git)
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Compile the Smart Contract**:
   ```bash
   truffle compile
   ```

4. **Deploy the Contract**:
   Ensure Ganache is running, then migrate the contract to the local blockchain:
   ```bash
   truffle migrate --network development
   ```

## File Structure
- **contracts/HealthRecords.sol**: Solidity contract containing the logic for storing health records.
- **migrations/2_deploy_health_records.js**: Migration script for deploying the contract.
- **test/**: Folder for contract testing (optional).
- **truffle-config.js**: Truffle configuration file to specify network and compiler settings.

## Usage
- **Start Ganache**:
  Open Ganache and ensure it is connected to `localhost:8545` or adjust the `truffle-config.js` network settings if necessary.

- **Run the DApp**:
  Use Node.js to build a frontend or interact with the contract via Truffle Console:
  ```bash
  truffle console --network development
  ```

  Example commands in the Truffle console:
  ```javascript
  let instance = await HealthRecords.deployed();
  await instance.createRecord("Sample public data", "Encrypted data here", "<doctor_address>", true, { from: "<patient_address>" });
  let publicData = await instance.getPublicData(0);
  console.log(publicData);
  ```

## Important Notes
- Ensure the Ethereum addresses provided in the function calls correspond to accounts loaded in Ganache.
- Handle secure storage of private keys and data encryption in a real-world deployment.
