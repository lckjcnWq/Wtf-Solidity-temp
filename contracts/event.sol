// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Event{
   mapping(address => uint) public _balances;
   
   event Transfer(address indexed from, address indexed to, uint amount);

   function _transfer(address from, address to , uint amount) external {
    _balances[from] = 10000000;
    _balances[from] -= amount;
    _balances[to] += amount;
    emit Transfer(from, to, amount);
   }

}
