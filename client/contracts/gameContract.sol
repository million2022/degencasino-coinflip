//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";


contract GameContract is Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter public betIdsTracker;

    struct Bet {
        uint256 betId;
        bool betStatus;
        uint256 betAmount;
        address player1;
        address player2;
        address winner;
    }

    mapping(address => uint256) public balances; 
    
    mapping(uint256 => Bet) public bets;

    function createBet() public payable {
        require(msg.value >= 0.01 ether, "Minimun deposit amount should be 0.01 ETH");
        require(msg.value <= 1 ether, "Maximum deposit amount should be 1 ETH");
        uint256 currentBetId = betIdsTracker.current();
        Bet memory newBet = Bet({ betId: currentBetId, betStatus: true, betAmount: msg.value, player1: msg.sender, player2: address(0), winner: address(0)  });
        bets[currentBetId] = newBet;
        balances[msg.sender] = balances[msg.sender] + msg.value;
        betIdsTracker.increment();
    }

    function joinBet(uint256 _betId) public payable {
        Bet memory currentBet = bets[_betId];
        require(msg.value == currentBet.betAmount, "Bet amount must be same");
        require(msg.sender == currentBet.player1, "You created this bet");
        currentBet.player2 = msg.sender;
        bets[_betId] = currentBet;
        balances[msg.sender] = balances[msg.sender] + msg.value;
    }

    function playBet(uint256 _betId, address _winner)  public {
        Bet memory currentBet = bets[_betId];
        currentBet.betStatus = false;
        currentBet.winner = _winner;
        if (currentBet.player1 == _winner) {
            balances[currentBet.player1] = balances[currentBet.player1] + currentBet.betAmount;
            balances[currentBet.player2] = balances[currentBet.player2] - currentBet.betAmount;
        } else {
            balances[currentBet.player2] = balances[currentBet.player2] + currentBet.betAmount;
            balances[currentBet.player1] = balances[currentBet.player1] - currentBet.betAmount;
        }

        bets[_betId] = currentBet;
    }

    function getBets() public view returns (Bet[] memory) {
        Bet[] memory ret = new Bet[](betIdsTracker.current());
        for (uint i = 0; i < betIdsTracker.current(); i++) {
            ret[i] = bets[i];
        }
        return ret;
    }
}
