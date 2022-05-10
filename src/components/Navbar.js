import React, { useState } from 'react';
import logo from '../assets/logo.png';

import Web3 from 'web3';
import Web3Modal from 'web3modal';

import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
// import Torus from "@toruslabs/torus-embed";
// import Portis from "@portis/web3";

// Example for Polygon/Matic:
const customNetworkOptions = {
    rpcUrl: 'https://rpc-mainnet.maticvigil.com',
    chainId: 137
}

export const providerOptions = {
    // // Example with injected providers
    // injected: {
    //     display: {
    //         name: "Injected",
    //         description: "Connect with the provider in your Browser"
    //     },
    //     package: null
    // },
    // // Example with WalletConnect provider
    // walletconnect: {
    //     display: {
    //         name: "WalletConnect",
    //         description: "Scan qrcode with your mobile wallet"
    //     },
    //     package: WalletConnectProvider,
    //     options: {
    //         infuraId: "c1ba29d27c6b40779d9a00a8850d4f9e"
    //     }
    // },
    // fortmatic: {
    //     package: Fortmatic, // required
    //     options: {
    //         key: "FORTMATIC_KEY", // required
    //         network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
    //     }
    // }
    walletconnect: {
        package: WalletConnectProvider, // requiredhow
        options: {
            infuraId: "INFURA_ID" // required
        }
    },
    // coinbasewallet: {
    //     package: CoinbaseWalletSDK, // Required
    //     options: {
    //         appName: "My Awesome App", // Required
    //         infuraId: "INFURA_ID", // Required
    //         rpc: "", // Optional if `infuraId` is provided; otherwise it's required
    //         chainId: 1, // Optional. It defaults to 1 if not provided
    //         darkMode: false // Optional. Use dark theme, defaults to false
    //     }
    // },
    fortmatic: {
        package: Fortmatic, // required
        options: {
            key: "FORTMATIC_KEY", // required
            network: {
                rpcUrl: 'https://rpc-mainnet.maticvigil.com',
                chainId: 137
            }
        }
    },
    // torus: {
    //     package: Torus, // required
    //     options: {
    //         networkParams: {
    //             host: "https://localhost:8545", // optional
    //             chainId: 1337, // optional
    //             networkId: 1337 // optional
    //         },
    //         config: {
    //             buildEnv: "development" // optional
    //         }
    //     }
    // },
    // portis: {
    //     package: Portis, // required
    //     options: {
    //         id: "PORTIS_ID" // required
    //     }
    // }
};

/*
*/

const Navbar = () => {
    const [provider, setProvider] = useState();

    const connectWallet = async() => {
        try {
            const web3modal = new Web3Modal({providerOptions})
            const provider = await web3modal.connect();
            setProvider(provider);
        } catch(error) {
            console.error(error);
        }
    }
    
    return (
        <div className='fixed flex flex-row w-full justify-between bg-black opacity-70 p-10'>
            <a href='/'><img src={logo} alt='Zion' width={60} height={60} /></a>
            {/* <button 
                type="button"
                onClick={connectWallet} 
                className="w-54 px-10 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-700 hover:shadow-xl active:bg-blue-900"
            >
                { provider ? `${provider.selectedAddress.slice(0, 12)}...` : 'Connect Wallet' }
            </button> */}
        </div>
    );
}

export default Navbar;