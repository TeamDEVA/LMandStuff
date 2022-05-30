// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.4;
pragma abicoder v2;


// allow special functions to only be done by the owner
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LeagueMaker is ReentrancyGuard, Ownable {
    using SafeMath for uint256;
    event leagueCreated(uint256 _leagueId, string _gameName, uint256 _time, uint256 _minEntry);
    event leagueLive(uint256 _leagueId, uint256 _time);
    event leagueClosed(uint256 _leagueId, uint256 _time, string[] _winners, uint256 _prizePerParticipant);

    event leagueJoined(uint256 _leagueId, uint256 _time, address _pAddress, string _nickName, bool isBlocked);
    event prizeClaimed(uint256 _leagueId, uint256 _time, address _pAddress, string _nickName, uint256 _amount);

    event toggleBlockPlayerEvent(uint256 _leagueId, string _name);

    uint256 public lastLeagueId; // Keeps track of how many leagues we have served

    enum Status {
        Open,
        Live,
        Closed
    }

    struct League {
        uint256 leagueId;
        Status status;
        address winner;
        uint256 openTime;
        uint256 liveTime;
        uint256 closeTime;
        uint256 minEntry;
        uint256 totalPrize;
        uint256 prizePerPlayer;
        bool exists;
    }

    struct Participant {
        address pAddress;
        string nickName;
        bool exists;
        bool isWinner;
        bool isBlocked;
    }

    mapping(uint256 => League) private _leagues;
    // from league id to string to address
    mapping(uint256 => mapping(address => string)) private _addressToString;
    mapping(uint256 => mapping(string => Participant)) private _leagueParticipants;


    constructor(){
        lastLeagueId = 0;
    } 
    // function toggleBlockPlayers(uint256 _leagueId, string[] memory _playerList) public onlyOwner {
    //     for(uint i = 0; i < _playerList.length; ++i)
    //     {
    //         string memory name = _playerList[i];
    //         _leagueParticipants[_leagueId][name].isBlocked = !  _leagueParticipants[_leagueId][name].isBlocked;
    //     }
    // }

    function toggleBlockPlayer(uint256 _leagueId, string memory _player) public onlyOwner {
        _leagueParticipants[_leagueId][_player].isBlocked = !_leagueParticipants[_leagueId][_player].isBlocked;
        emit toggleBlockPlayerEvent(_leagueId, _player);
    }
    
    // view available leagues 
    function viewLeagues(Status myStatus) private view returns(League[] memory){
        // count the amount of created leagues
        uint counter = 0;
        for (uint i = 1; i <= lastLeagueId; i++){
            // starts at 1 because the first created league has id 1
            if (_leagues[i].status == myStatus){
                counter++;
            }
        }

        League[] memory leagues = new League[](counter);
        counter = 0; 
        for (uint i = 1; i <= lastLeagueId; i++){
            if (_leagues[i].status == myStatus){
                leagues[counter] = (_leagues[i]);
                counter++;
            }
            
        }
        return leagues;
    }

    function viewOpenLeagues() public view returns(League[] memory){
        return viewLeagues(Status.Open);
    }
    
    function viewLiveLeagues() public view returns(League[] memory){
        return viewLeagues(Status.Live);
    }
    
    function viewClosedLeagues() public view returns(League[] memory){
        return viewLeagues(Status.Closed);
    }




    function openLeague(
        string memory _gameName,
        uint256 _minEntry, //minimum price for entry
        uint256 _liveTime, // the time the league is live
        uint256 _closeTime // the time to close the league
        ) public onlyOwner //only owner can make leagues for now{
        {
            lastLeagueId++;

            _leagues[lastLeagueId] = League({
                leagueId: lastLeagueId,
                status: Status.Open,
                winner: msg.sender,
                openTime: block.timestamp, // set the creation time to now
                liveTime: _liveTime, // set the live time
                closeTime: _closeTime, // set the close time
                minEntry: _minEntry,
                totalPrize: 0,
                prizePerPlayer: 0,
                exists: true
            });
            emit leagueCreated(lastLeagueId, _gameName, block.timestamp, _minEntry);
        }

    
    // nonReentrant makes sure you only enter league once
    function joinLeague(uint256 _leagueId, string memory _nickName) external 
    nonReentrant payable{
        require(_leagueParticipants[_leagueId][_nickName].exists==false, "This player is already registered");
        //require(_leagueParticipants[_leagueId][_nickName].isBlocked=false, "this player is blocked from joining things");
        require(_leagueParticipants[_leagueId][_addressToString[_leagueId][msg.sender]].exists==false, "This address is already registered");
        require(_leagues[_leagueId].exists==true, "This league does not exist");
        //can only join if value is bigger than minimum entry
        require(msg.value == _leagues[_leagueId].minEntry, "Provide the exact value of minimum entry requirement");
        
        //can only join if league is open;
        require(_leagues[_leagueId].status == Status.Open, "This league is not open");
        
        _addressToString[_leagueId][msg.sender] = _nickName; 
        // add the participant to the league
        _leagueParticipants[_leagueId][_nickName] = Participant({
            pAddress: msg.sender,
            nickName: _nickName,
            exists: true,
            isWinner: false,
            isBlocked: false
        });
        // add the prize to the total rewards
        _leagues[_leagueId].totalPrize = _leagues[_leagueId].totalPrize.add(msg.value);
        emit leagueJoined(_leagueId, block.timestamp, msg.sender, _nickName, false);

    }

    // TODO: cancelLeague + cancelUser

    // onlyOwner can start a league
    function liveLeague(uint256 _leagueId) external onlyOwner {
        // the status must be created to start it
        require(_leagues[_leagueId].status == Status.Open, "The league must be created to live it");
        _leagues[_leagueId].status = Status.Live;

        emit leagueLive(_leagueId, block.timestamp);
    }

    // onlyOwner can close a league
    function closeLeague(uint256 _leagueId, string[] memory _winners) external onlyOwner {
        // status must be live
        require(_leagues[_leagueId].status == Status.Live, "The league must be live to close it");

        for (uint256 index = 0; index < _winners.length; index++) {
            require(_leagueParticipants[_leagueId][_winners[index]].isBlocked == false, "can't pick blocked players to be winner");
            _leagueParticipants[_leagueId][_winners[index]].isWinner = true;
        }
        _leagues[_leagueId].status = Status.Closed;
        _leagues[_leagueId].prizePerPlayer = _leagues[_leagueId].totalPrize.div(_winners.length);

        emit leagueClosed(_leagueId, block.timestamp, _winners, _leagues[_leagueId].prizePerPlayer);
    }

    function claimPrize(uint256 _leagueId) external {
        string memory nickName = _addressToString[_leagueId][msg.sender];

        require(_leagueParticipants[_leagueId][nickName].isWinner==true, "You are not the winner");
        require(_leagueParticipants[_leagueId][nickName].isBlocked==false, "You are blocked :(");
        require(_leagues[_leagueId].status == Status.Closed, "This league is not closed yet");
        require(_leagues[_leagueId].exists==true, "This league does not exist");
        
        // send all money to the winner
        payable(msg.sender).transfer(_leagues[_leagueId].prizePerPlayer);

        // delete all information about this league to free up the gas
        delete _leagueParticipants[_leagueId][nickName];
        emit prizeClaimed(_leagueId, block.timestamp, msg.sender, nickName, _leagues[_leagueId].totalPrize);
    }
}