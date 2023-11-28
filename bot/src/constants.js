// Globals
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import dotenv from "dotenv";
dotenv.config();

import { ethers } from "ethers";
import { logError } from "./logging.js";
import { logInfo } from "./logging.js";

const jsonString = JSON.parse(process.env.RPC_WSS_URL);
const lengthJson=jsonString.length;
var RPC_URL=(jsonString[0]["RPC_URL"]);
var RPC_URL_WSS=(jsonString[0]["RPC_URL_WSS"]);

//console.log(jsonString);
/*
export const loadEnv = async(number)=>{
  RPC_URL=(jsonString[number]["RPC_URL"]);
  //console.log(RPC_URL);
  RPC_URL_WSS=(jsonString[number]["RPC_URL_WSS"]);
  //console.log(RPC_URL_WSS);
}
*/

const IUniswapV2PairAbi = require("./abi/IUniswapV2Pair.json");
//let RPC_URL, RPC_URL_WSS; 

let hasEnv = true;

const ENV_VARS = [
  "RPC_WSS_URL",
  "PRIVATE_KEY",
  "FLASHBOTS_AUTH_KEY",
  "SANDWICH_CONTRACT",
];

for (let i = 0; i < ENV_VARS.length; i++) {
  if (!process.env[ENV_VARS[i]]) {
    logError(`Missing env var ${ENV_VARS[i]}`);
    hasEnv = false;
  }
}

if (!hasEnv) {
  process.exit(1);
}


// Contracts'
export const CONTRACTS = {
  UNIV2_ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",

  // Sandwich contract
  SANDWICH: process.env.SANDWICH_CONTRACT,
};

// Helpful tokens for testing
export const TOKENS = {
  WETH: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
  USDC: "0xd35cceead182dcee0f148ebac9447da2c4d449c4",
};
/*
export const provider = [];
const testingcode=[];
for (let i = 0; i < jsonString.length; i++) {
  const item = jsonString[i]["RPC_URL"];

  // Now you can work with each item, for example:
  console.log(`Item ${i}:`, item);
  provider.push(new ethers.providers.JsonRpcProvider(item));
  testingcode.push(item);

}

logInfo("||||||||||||||||||||||||||||||||||||||||||||||");
logInfo(provider[0]);
logInfo(testingcode[0]);
logInfo("||||||||||||||||||||||||||||||||||||||||||||||");
/*
export const provider = new ethers.providers.JsonRpcProvider(
  //process.env.RPC_URL
  RPC_URL
);
*/

//WSS Provider
export const wssProvider = [];
export const searcherWallet = [];
export const authKeyWallet = [];
export const uniswapV2Pair = [];
for (let i = 0; i < jsonString.length; i++) {
  const item = jsonString[i]["RPC_URL_WSS"];

  // Now you can work with each item, for example:
  console.log(`Item ${i}:`, item);
  wssProvider.push(new ethers.providers.WebSocketProvider(item));
  searcherWallet.push(new ethers.Wallet(process.env.PRIVATE_KEY,new ethers.providers.WebSocketProvider(item)));
  authKeyWallet.push(new ethers.Wallet(process.env.PRIVATE_KEY,new ethers.providers.WebSocketProvider(item)));
  uniswapV2Pair.push(ethers.constants.AddressZero,IUniswapV2PairAbi,new ethers.Wallet(process.env.PRIVATE_KEY,new ethers.providers.WebSocketProvider(item)));
}

/*
export const wssProvider = new ethers.providers.WebSocketProvider(
  //process.env.RPC_URL_WSS
  RPC_URL_WSS
);
*/
// Used to send transactions, needs ether

/*
export const searcherWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  wssProvider[0]   
);
*/
// Used to sign flashbots headers doesn't need any ether
/*
export const authKeyWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  wssProvider[0]
);
*/
// Common contracts
/*
export const uniswapV2Pair = new ethers.Contract(
  ethers.constants.AddressZero,
  IUniswapV2PairAbi,
  searcherWallet[0]
);*/
