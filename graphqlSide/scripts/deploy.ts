// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {Eth} from 'web3-eth';
import * as dotenv from "dotenv";
import * as fs from 'fs';

const filepath = "./logs"

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const LMF = await ethers.getContractFactory("LeagueMaker");
  const LM = await LMF.deploy();
  await LM.deployed();
  console.log("LM deployed to:", LM.address);
  const fileContent = LM.address + '\n';
  if(fs.existsSync(filepath))
  {
    fs.appendFileSync(filepath, fileContent);
  } else 
  {
    fs.writeFile(filepath, fileContent, (err) => {
      if (err) throw err;
    }); 
  }
  console.log("written address to file logs");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
