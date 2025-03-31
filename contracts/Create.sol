// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Pair{

    address public factory;
    address public token0;
    address public token1;

    constructor() payable{
        factory = msg.sender;
    }

    function initialize(address _token0, address _token1) external{
        require(msg.sender == factory, "Not factory");
        token0 = _token0;
        token1 = _token1;
    }
}

contract PairFactory{
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    function createPair(address _token0, address _token1) external returns (address pairAddr){
        require(_token0 != address(0) && _token1 != address(0), "Invalid token address");
        require(getPair[_token0][_token1] == address(0), "Pair already exists");

        // create new pair
        Pair pair = new Pair();
        pair.initialize(_token0, _token1);

        // 更新地址map
        pairAddr = address(pair);
        getPair[_token0][_token1] = pairAddr;
        getPair[_token1][_token0] = pairAddr;
        allPairs.push(pairAddr);

        return pairAddr;
    }
}
