import React, { useState, useEffect } from 'react';
import Web3 from "web3"
import Web3Modal from 'web3modal';
import {abi} from "../abi/index"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";

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

const MintButton = ({onClick}) => {
    return (
        <button 
            type="button"
            onClick={onClick}
            className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 px-10 py-4 text-white font-bold rounded-full active:bg-blue-900"
        >
            Mint
        </button>
    );
}

const WalletButton = ({onClick}) => {
    const [provider, setProvider] = useState();
    return (
        <button 
            type="button"
            onClick={onClick} 
            className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 w-54 px-10 py-4 text-white font-bold rounded-full active:bg-blue-900"
        >
            { provider ? `${provider.selectedAddress.slice(0, 12)}...` : 'Connect Wallet' }
        </button>
    );
}

const Mint = () => {
    const [provider, setProvider] = useState(0);
    const [mintval, setMintval] = useState(1);

    useEffect(() => {
        if ( mintval <= 1 )
            setMintval(1);
        if ( mintval > 100 )
            setMintval(100);
        
    }, [mintval]);

    const mint = async () => {
        console.log('asdf')
        window.web3 = new Web3(window.ethereum);

        const contract = await new window.web3.eth.Contract(
            abi, "0x8062aE3a4032C56D87D96C1e2eD8f96947DDDD3b"
        );
        const price = 5;
        const tokenPrice = window.web3.utils.toWei(price + '', 'ether');
        try {
            contract.methods.mint().send({
                from: window.ethereum.selectedAddress,
                gasPrice: '700000000000',
                value: tokenPrice
            }).on('receipt', (res) => {
                console.log('success')
            }).on('error', (error) => {
               console.log('error', error) 
            });
        } catch (error) {
           console.error(error);
        }
    }

    const connectWallet = async() => {
        try {
            const web3modal = new Web3Modal({providerOptions})
            const provider = await web3modal.connect();
            setProvider(provider);
        } catch(error) {
            console.error(error);
        }
    }

    // const minMint = async() => {
    //     try {
    //         mintval --;
    //         setMintval(mintval);
    //     } catch(error) {
    //         console.error(error);
    //     }
    // }

    // const plusMint = async() => {
    //     try {
    //         mintval ++;
    //         setMintval(mintval);
    //     } catch(error) {
    //         console.error(error);
    //     }
    // }

    return (
        <section className='h-screen'>
            <div className="h-screen grid grid-cols-2 bg-[url('./assets/back.jpg')] bg-cover">
                <div className='pt-60 justify-center text-center'>
                    <h1 className='text-6xl text-white bg-black opacity-80 rounded-xl mx-4 py-8 shadow-2xl decoration-white decoration-wavy'>The Underground</h1>
                    <div className="flex flex-row w-full justify-center pt-10 pb-10">
                        <button onClick={() => setMintval(mintval - 1)}  className="w-20 py-4 text-black font-bold rounded-full text-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800">ー</button>
                        <input type="text" id="mint_val" class="w-25 mx-5 bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-full text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={mintval}></input>
                        <button onClick={() => setMintval(mintval + 1)}  className="w-20 py-4 text-black font-bold rounded-full text-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800">✛</button>
                    </div>
                    { provider == 0 } ? <WalletButton onClick={() => connectWallet()}/> : <MintButton onClick={() => mint()}/>
                </div>
                <div>
                </div>
            </div>
        </section>
    );
}

export default Mint;