
// ABI and Contract Address
const contractAddress = "0xDF602dbf2D1F3C4335377A33A080a6d9060AA164"; // Replace with actual contract address
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "recordId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "patient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "doctor",
          "type": "address"
        }
      ],
      "name": "RecordCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "recordCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "records",
      "outputs": [
        {
          "internalType": "string",
          "name": "publicData",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "encryptedData",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "patient",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "doctor",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isPrivate",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_publicData",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_encryptedData",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_doctor",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_isPrivate",
          "type": "bool"
        }
      ],
      "name": "createRecord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_recordId",
          "type": "uint256"
        }
      ],
      "name": "getRecord",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

// Web3 Setup
let web3;
let healthRecordsContract;

if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // Request account access
} else {
    console.error("MetaMask is not installed!");
}

// Connect to the contract
healthRecordsContract = new web3.eth.Contract(contractABI, contractAddress);

// Load the secret key for encryption (from environment variables)
const secretKey = "51c66db150d59be4193bc69a0bbe0ce696e61fb1ed1080ea1cc7df6d07645cba"; 

// Encryption Functions
function encryptData(data) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function decryptData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Handle form submission
document.getElementById("recordForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const patientName = document.getElementById("patientName").value;
    const publicRecord = document.getElementById("publicRecord").value;
    const privateRecord = document.getElementById("privateRecord").value;

    const encryptedPrivateRecord = encryptData(privateRecord);

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Save the data on the blockchain
    try {
        await healthRecordsContract.methods.addRecord(patientName, publicRecord, encryptedPrivateRecord).send({ from: account });
        document.getElementById("status").innerText = "Record successfully added to the blockchain!";
    } catch (error) {
        console.error("Error saving record:", error);
        document.getElementById("status").innerText = "Error adding record to the blockchain.";
    }
});
