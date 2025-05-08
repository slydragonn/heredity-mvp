import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar/DashboardNavbar';
import ConnectionBanner from '../components/ConnectionBanner';
import CreateTestament from '../components/Testaments/CreateTestament';
import ManageTestaments from '../components/Testaments/ManageTestaments';
import MyInheritances from '../components/MyInheritances';
import HeredityArtifact from '../artifacts/contracts/Heredity.sol/Heredity.json';
import { avalancheFuji } from '../config/networks';


function Dashboard() {
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [activeSection, setActiveSection] = useState('create');
  const [loading, setLoading] = useState(true);

  const CONTRACT_ADDRESS = "0xf2e12956967eE39f548871027B3A6C29BDC07063";

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        

        const networkId = (await provider.getNetwork()).chainId;
        if (networkId !== 43113) {
          try {
            await switchToAvalancheFuji();
          } catch (error) {
            toast.error("Por favor, conecta con la red de Avalanche C-Chain");
          }
        }

        setAccount(address);
        setSigner(signer);
        setProvider(provider);
        
        const contractAddress = CONTRACT_ADDRESS || '';
        const contract = new ethers.Contract(contractAddress, HeredityArtifact.abi, signer);
        setContract(contract);
        
        toast.success("¡Wallet conectada correctamente!");
        setLoading(false);
      } else {
        toast.error("Por favor, instala MetaMask");
      }
    } catch (error) {
      console.error("Error al conectar wallet:", error);
      toast.error("Error al conectar wallet");
    }
  };

  async function switchToAvalancheFuji() {
    try {
      // Intenta cambiar a la red Fuji
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: avalancheFuji.chainId }]
      });
    } catch (switchError) {
      // Si la red no está agregada, agrégala
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [avalancheFuji]
          });
        } catch (addError) {
          console.error("Error al agregar la red:", addError);
        }
      }
    }
  }

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            connectWallet();
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    checkConnection();
    
    // Escuchar cambios de cuenta
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        connectWallet();
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar 
        account={account} 
        connectWallet={connectWallet} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-avalanche"></div>
          </div>
        ) : !account ? (
          <ConnectionBanner connectWallet={connectWallet} />
        ) : (
          <div>
            {activeSection === 'create' && (
              <CreateTestament contract={contract} account={account} />
            )}
            
            {activeSection === 'manage' && (
              <ManageTestaments contract={contract} account={account} />
            )}
            
            {activeSection === 'inheritances' && (
              <MyInheritances contract={contract} account={account} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;