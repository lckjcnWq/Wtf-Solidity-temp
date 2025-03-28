// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract OtherContract {
    uint256 private _x = 0;

    event Log(uint amount, uint gas);

    function getBalance() view public returns(uint){
        return address(this).balance;
    }

    function getX() external view  returns(uint x){
        x = _x;
    }
    
    // 可以调整状态变量_x的函数，并且可以往合约转ETH (payable)
    function setX(uint256 x) external payable{
        _x = x;
        // 如果转入ETH，则释放Log事件
        if(msg.value > 0){
            emit Log(msg.value, gasleft());
        }
    }
    
}
