import { BigInt, BigDecimal, Bytes, Address } from "@graphprotocol/graph-ts";

import {
  LeagueMaker,
  OwnershipTransferred,
  leagueClosed,
  leagueCreated,
  leagueLive,
  leagueJoined, 
  prizeClaimed
} from "../generated/LeagueMaker/LeagueMaker"

import { concat } from "@graphprotocol/graph-ts/helper-functions";

import { Game, League, Prize, LeaguePlayer, User, Log, AllLog } from '../generated/schema';
import { toggleBlockPlayerEvent, setAdminStateEvent, TransferOwnershipCall } from '../generated/LeagueMaker/LeagueMaker';


// BigNumber-like references
let ZERO_BI = BigInt.fromI32(0);
let ONE_BI = BigInt.fromI32(1);
let ZERO_BD = BigDecimal.fromString("0");

// this function returns all the logs
function getAllLog(): AllLog
{
  let allLog = AllLog.load("suka");
  if(allLog == null) 
  {
    allLog = new AllLog("suka");
    let logs = allLog.logs;
    allLog.nextId = 0;
    // make a starting log
    let log = new Log(allLog.nextId.toString());    
    log.log = "start logging";
    log.save();
    // push the new starting log to allLog
    logs.push(log.id);
    allLog.logs = logs;
    allLog.nextId = allLog.nextId + 1;
    allLog.save();
  }
  return allLog;
}

function saveNewLog(str:string):void {
  let allLog = getAllLog();
  // make a starting log
  let log = new Log(allLog.nextId.toString());    
  log.log = " " + str;
  log.save();
  // push the new starting log to allLog
  //let logs = allLog.logs;
  let newLogs:string[] = []; // make an empty log field
  newLogs.push(log.id);
  let i = allLog.nextId - 1;
  let cnt = 0;
  while(i >= 0 && cnt < 9) // load the 8 latest log
  {
    log = Log.load(i.toString()) as Log;
    newLogs.push(log.id);
    cnt ++;
    i --;
  }
  allLog.logs = newLogs;
  allLog.nextId = allLog.nextId + 1;
  allLog.save();
}

export function handleSetAdminStateEvent(event: setAdminStateEvent): void {
  const userAddr = event.params.userAddr as Address;
  const state = event.params.state as boolean;
  const logMsg1 = "setting " + userAddr.toHexString().toLowerCase() + " to admin state: " + state.toString();
  saveNewLog(logMsg1);
  const user = User.load(userAddr.toHexString().toLowerCase());
  if(user)
  {
    user.isAdmin = state;
    user.save();
  }
}

export function handleToggleBlockPlayerEvent(event: toggleBlockPlayerEvent): void {
  const logMsg1 = "blocking " +  event.params._leagueId.toString() + " " + event.params._name.toString();
  saveNewLog(logMsg1);
  let league = League.load(event.params._leagueId.toString());
  if(league)
  {
    let leaguePlayer = LeaguePlayer.load(event.params._leagueId.toString() + event.params._name);
    if(leaguePlayer)
    {
      const logMsg2 = "loaded player in league " + event.params._leagueId.toString() + " name: " +  event.params._name;
      saveNewLog(logMsg2);
      leaguePlayer.isBlocked = ! leaguePlayer.isBlocked;
      leaguePlayer.save();
      let user = User.load(leaguePlayer.user as string);
      if(user)
      {
        user.isBlocked = ! user.isBlocked;
        user.save();
        const logMsg4 = "blocked user " + (user.address as string);
        saveNewLog(logMsg4);
      }
    }
  } else {
    const logMsg3 = "WHAT THE FUCK can't load league?";
    saveNewLog(logMsg3);
  }
}
export function handleLeagueCreated(event: leagueCreated): void {
  let league = new League(event.params._leagueId.toString());
  
  let game = Game.load(event.params._gameName.toString());
  if (game === null){
    game = new Game(event.params._gameName.toString());
    game.name = event.params._gameName.toString();
  }
  league.game = game.id;

  league.totalPlayers = ZERO_BI;
  league.totalPrize = ZERO_BI; 

  league.minEntry = event.params._minEntry;
  
  league.openTime = event.params._time;
  league.status = "Open";

  game.save();
  league.save();

}

export function handleLeagueLive(event: leagueLive): void {
  let league = League.load(event.params._leagueId.toString());
  if (league){
    league.status = "Live";
    league.save();
  }

}

export function handleLeagueJoined(event: leagueJoined): void{
  let leaguePlayer = new LeaguePlayer(event.params._leagueId.toString() + event.params._nickName.toString());
  leaguePlayer.nickName = event.params._nickName;
  leaguePlayer.joinedAt = event.params._time;
  leaguePlayer.isBlocked = event.params.isBlocked;

  let user = User.load(event.params._pAddress.toHexString().toLowerCase());
  if (user === null){
    user = new User(event.params._pAddress.toHexString().toLowerCase());
    user.address = event.params._pAddress.toHexString().toLowerCase();
    user.totalLeagues = ONE_BI;
    user.isBlocked = event.params.isBlocked;
  }else{
    let totallgs: BigInt = user.totalLeagues as BigInt;
    user.totalLeagues = totallgs.plus(ONE_BI);
  }

  if(user){
    leaguePlayer.user = user.id;
    user.totalLeaguesWinner = ZERO_BI;
  }
  let league = League.load(event.params._leagueId.toString());
  if (league){
    if(league.totalPlayers)
      league.totalPlayers = (league.totalPlayers as BigInt).plus(ONE_BI);
    league.save();
    leaguePlayer.league = league.id;
  }
  user.isAdmin = false;
  user.save();
  leaguePlayer.save();
  user.save();
}

export function handleLeagueClosed(event: leagueClosed): void {
  let league = League.load(event.params._leagueId.toString());
  if (league){
    league.status = "Closed";
  }
  let wnrs = event.params._winners;
  for(let i =0; i < wnrs.length; i++){
    let prize = new Prize(event.params._leagueId.toString() + wnrs[i].toString());
    if (league){
    prize.league = league.id;
    }
    prize.amount = event.params._prizePerParticipant;
    prize.createdAt = event.params._time;
    let leaguePlayer = LeaguePlayer.load(event.params._leagueId.toString() + wnrs[i]);
    if(leaguePlayer){
      leaguePlayer.isWinner = true;
      let str: string = leaguePlayer.user as string;
      let user = User.load(str.toLowerCase());
      if (user){
        prize.claimableBy = user.id;
        if (user.totalLeaguesWinner){
          let total: BigInt = user.totalLeaguesWinner as BigInt;
          user.totalLeaguesWinner = total.plus(ONE_BI);
        }
        user.save();
      }
      leaguePlayer.save();
    }
    prize.claimed = false;
    if(prize){
      prize.save();
    }
    }
}

export function handlePrizeClaimed(event: prizeClaimed): void{
  let prize = Prize.load(event.params._leagueId.toString() + event.params._nickName.toString());
  if (prize){
    prize.claimed = true; 
    prize.claimedAt = event.params._time;
    prize.save();
  }
  
}