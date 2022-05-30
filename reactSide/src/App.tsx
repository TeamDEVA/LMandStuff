import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {connectToMetamask, claimPrize, closeLeague, joinLeague, liveLeague, openLeague} from './API/writeData/writeFunctions';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as Web3Token from 'web3-token';
// const Web3 = require("web3");

import axios from 'axios';
import { Counter } from './features/counter/Counter';
import LeagueList from './API/Page/leagueList';
import {
  updateList,
  getList
} from './features/leagueList/leagueList';

import {
  connectContract,
  getContract
} from './features/contractRedux/contractRedux';

import { useAppSelector, useAppDispatch } from './app/hooks';

const LMabi = require("./contracts/LeagueMaker.json");


const App = () => {
  let [selectedAddress, setAddress] = useState<any>();
  let [contract, setContract] = useState<any>();


  if (!selectedAddress) {
    return (
      <>
        <button onClick={async () => {
          const that = await connectToMetamask();
          setContract(that?.contract);
        }
          }>Connect to Metamask
          </button>
        {/* <button onClick={() => {
          dispatch(updateList("okok"));
          console.log(list);
          }}> ok oko k</button> */}
        <button onClick = {async()=>{
          await openLeague(contract, "Demon Slayers", BigInt(1000), BigInt(1000), BigInt(1000));
        }}>
          open new League Demon Slayers
        </button>
        <button onClick = {
          async ()=>{}
        }>
          Get league by Id
        </button>
        <Counter />
      </>
    )
  } else {
    return (
      <div>
        <p>Welcome!</p>
      </div>
    );
  }
}

export default App;