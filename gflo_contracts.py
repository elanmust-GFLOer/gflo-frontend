"""
GFLO Smart Contract Integration Module
"""

import json
from web3 import Web3
import os

class GFLOContracts:
    def __init__(self, network="baseSepolia"):
        # Network configuration
        self.networks = {
            "baseSepolia": {
                "rpc": os.getenv("BASE_SEPOLIA_RPC_URL", "https://sepolia.base.org"),
                "chain_id": 84532
            },
            "base": {
                "rpc": os.getenv("BASE_RPC_URL", "https://mainnet.base.org"),
                "chain_id": 8453
            }
        }
        
        # Initialize Web3
        network_config = self.networks.get(network, self.networks["baseSepolia"])
        self.w3 = Web3(Web3.HTTPProvider(network_config["rpc"]))
        
        if not self.w3.is_connected():
            raise Exception(f"Failed to connect to {network} network")
            
        print(f"✅ Connected to {network} network")
        print(f"📡 Latest block: {self.w3.eth.block_number}")
        
        # Load contract addresses (from deployment file)
        self.load_contract_addresses()
        
        # Load ABIs
        self.load_abis()
        
        # Initialize contract instances
        self.init_contracts()
    
    def load_contract_addresses(self):
        """Load contract addresses from deployment file"""
        try:
            # Try to load from deployed addresses file
            with open("../../gflo-contracts/deployed-addresses-baseSepolia.json", "r") as f:
                addresses = json.load(f)
                
            self.addresses = {
                "GFLOToken": addresses.get("GFLOToken"),
                "UserPathRegistry": addresses.get("UserPathRegistry"),
                "SovereignModule": addresses.get("SovereignModule"),
                "PraxisModule": addresses.get("PraxisModule"),
                "ReformerModule": addresses.get("ReformerModule"),
                "MetadataValidator": addresses.get("MetadataValidator")
            }
            
            print("📄 Contract addresses loaded from deployment file")
            
        except FileNotFoundError:
            # Fallback to environment variables
            self.addresses = {
                "GFLOToken": os.getenv("GFLO_TOKEN_ADDRESS"),
                "UserPathRegistry": os.getenv("REGISTRY_ADDRESS"),
                "SovereignModule": os.getenv("SOVEREIGN_MODULE_ADDRESS"),
                "PraxisModule": os.getenv("PRAXIS_MODULE_ADDRESS"),
                "ReformerModule": os.getenv("REFORMER_MODULE_ADDRESS"),
                "MetadataValidator": os.getenv("METADATA_VALIDATOR_ADDRESS")
            }
            
            print("📄 Contract addresses loaded from environment variables")
    
    def load_abis(self):
        """Load contract ABIs from compiled artifacts"""
        base_path = "../../gflo-contracts/artifacts/contracts"
        
        self.abis = {}
        
        contracts_to_load = [
            ("GFLOToken", "GFLOToken.sol/GFLOToken.json"),
            ("UserPathRegistry", "UserPathRegistry.sol/UserPathRegistry.json"),
            ("SovereignModule", "SovereignModule.sol/SovereignModule.json"),
            ("PraxisModule", "PraxisModule.sol/PraxisModule.json"),
            ("ReformerModule", "ReformerModule.sol/ReformerModule.json"),
            ("MetadataValidator", "MetadataValidator.sol/MetadataValidator.json")
        ]
        
        for contract_name, artifact_path in contracts_to_load:
            try:
                artifact_file = os.path.join(base_path, artifact_path)
                with open(artifact_file, "r") as f:
                    artifact = json.load(f)
                    self.abis[contract_name] = artifact["abi"]
                print(f"✅ Loaded ABI for {contract_name}")
            except FileNotFoundError:
                print(f"⚠️  ABI not found for {contract_name}")
                self.abis[contract_name] = []
    
    def init_contracts(self):
        """Initialize contract instances"""
        self.contracts = {}
        
        for name, address in self.addresses.items():
            if address and self.abis.get(name):
                self.contracts[name] = self.w3.eth.contract(
                    address=Web3.to_checksum_address(address),
                    abi=self.abis[name]
                )
                print(f"✅ Initialized {name} contract")
    
    # Helper methods for common operations
    
    def get_token_balance(self, address):
        """Get GFLO token balance for an address"""
        if "GFLOToken" in self.contracts:
            balance = self.contracts["GFLOToken"].functions.balanceOf(address).call()
            return self.w3.from_wei(balance, 'ether')
        return 0
    
    def get_user_paths(self, address):
        """Get user paths for an address"""
        if "UserPathRegistry" in self.contracts:
            try:
                paths = self.contracts["UserPathRegistry"].functions.getUserPaths(address).call()
                return paths
            except:
                return []
        return []
    
    def create_user_path(self, from_address, private_key, path_name, metadata):
        """Create a new user path"""
        if "UserPathRegistry" in self.contracts:
            # Prepare transaction
            contract = self.contracts["UserPathRegistry"]
            
            # Encode metadata
            metadata_json = json.dumps(metadata)
            
            # Build transaction
            nonce = self.w3.eth.get_transaction_count(from_address)
            
            tx = contract.functions.createUserPath(
                path_name,
                metadata_json
            ).build_transaction({
                'chainId': self.w3.eth.chain_id,
                'gas': 200000,
                'gasPrice': self.w3.eth.gas_price,
                'nonce': nonce,
            })
            
            # Sign transaction
            signed_tx = self.w3.eth.account.sign_transaction(tx, private_key)
            
            # Send transaction
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.raw_transaction)
            
            # Wait for receipt
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': receipt.status == 1,
                'tx_hash': tx_hash.hex(),
                'gas_used': receipt.gasUsed
            }
        
        return {'success': False, 'error': 'Contract not initialized'}
    
    def get_contract_info(self):
        """Get information about all deployed contracts"""
        info = {
            'network': self.w3.eth.chain_id,
            'block_number': self.w3.eth.block_number,
            'contracts': {}
        }
        
        for name, contract in self.contracts.items():
            info['contracts'][name] = {
                'address': contract.address,
                'functions': [fn for fn in contract.functions.__dict__.keys() if not fn.startswith('_')]
            }
        
        return info

# Singleton instance
gflo_contracts = None

def get_gflo_contracts(network="baseSepolia"):
    """Get or create GFLO contracts instance"""
    global gflo_contracts
    if gflo_contracts is None:
        gflo_contracts = GFLOContracts(network)
    return gflo_contracts
