import { Web3 } from 'web3';
import * as bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';

// --- KONFIGURÁCIÓ ---
const INFURA_URL = "https://sepolia.infura.io/v3/52c5b898077a4686becc8db02ba0bfc5"; 
const CONTRACT_ADDRESS = "0x2ebCCEdAFA8D7Da99Ed5d342342F0EA0C3895532";
const ACC2_ADDRESS = "0xBF579B9DFe4E8f017eaFD67390f359B229380b80";

// IDE MÁSOLD BE A 12 SZAVADAT (Idézőjelek közé, szóközökkel elválasztva)
const MNEMONIC = "fever muscle tank parade smart coconut various day tube stone mimic forget"

const web3 = new Web3(INFURA_URL);

async function getPrivateKeyFromMnemonic(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const hdwallet = hdkey.fromMasterSeed(seed);
    // Az Ethereum alapértelmezett útvonala (m/44'/60'/0'/0/0 -> ez az első számla, azaz az A1)
    const wallet = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    return wallet.getPrivateKeyString();
}

const abi = [{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "transfer","outputs": [{"name": "success","type": "bool"}],"type": "function"}];
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

async function sendGFLO() {
    try {
        console.log("🔐 Mnemonic feldolgozása a Sovereign modullal...");
        const privateKey = await getPrivateKeyFromMnemonic(MNEMONIC);
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        const A1_ADDRESS = account.address;

        console.log(`🌊 Kapcsolódás: ${A1_ADDRESS} fiókból indítunk...`);
        
        const amount = web3.utils.toWei('100000', 'ether'); 
        const query = contract.methods.transfer(ACC2_ADDRESS, amount);
        
        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await query.estimateGas({ from: A1_ADDRESS });

        const tx = {
            from: A1_ADDRESS,
            to: CONTRACT_ADDRESS,
            data: query.encodeABI(),
            gas: gasEstimate,
            gasPrice: gasPrice
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        console.log("🚀 Hullám kiküldése a Sepolia hálózatra...");
        
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        console.log("✅ SIKER! A GFLOw áramlik.");
        console.log("🔗 Hash:", receipt.transactionHash);

    } catch (error) {
        console.error("❌ Hiba:", error.message);
    }
}

sendGFLO();
