import { ethers } from "ethers";

const LMabi= require("../../contracts/LeagueMaker.json");



export const connectToMetamask = async () => {
        try {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
            const signer = provider.getSigner();
            await provider.send("eth_requestAccounts", []);
            const accounts = await provider.send("eth_requestAccounts", []);

            let abi = LMabi;
            const account = await signer.getAddress();
            console.log("You've signed in with account:", await signer.getAddress());
            let contractAddress: string = process.env.REACT_APP_THANKS_ADDRESS_BNB as string;
            const contract = new ethers.Contract(contractAddress, abi, provider);
            let contractWithSigner = contract.connect(signer);
            return {
                contract: contractWithSigner,
                accountAddress: accounts[0]
            }
        } catch {
            console.error("failed to connect to metamask");
            return null;
        }
}

export async function openLeague(
    contract: ethers.Contract,
    _gameName: string,
    _minEntry: BigInt,
    _liveTime: BigInt,
    _closeTime: BigInt

) {
    let tx = await contract.openLeague(_gameName, _minEntry, _liveTime, _closeTime);
    // The operation is NOT complete yet; we must wait until it is mined
    await tx.wait();
}

export async function liveLeague(
    contract: ethers.Contract,
    _leagueId: BigInt
) {
      let tx = await contract.liveLeague(_leagueId);
      await tx.wait();
}

export async function closeLeague(
    contract: ethers.Contract,
    _leagueId: BigInt,
    _winners: string[]
) {
      let tx = await contract.closeLeague(_leagueId, _winners);
      await tx.wait();
}

export async function joinLeague(
    contract: ethers.Contract,
    _leagueId: BigInt,
    _nickName: string,
    _minEntry: BigInt
) {
      let tx = await contract.claimPrize(_leagueId, {value: _minEntry});
      await tx.wait();
}

export async function claimPrize(
    contract: ethers.Contract,
    _leagueId: BigInt
) {
      let tx = await contract.claimPrize(_leagueId);
      await tx.wait();
}

