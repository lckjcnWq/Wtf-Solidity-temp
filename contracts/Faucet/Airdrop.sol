// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol"; //import IERC20

contract Airdrop {

    mapping(address => uint) failTransferList;

    function multiTransferToken(address _token,address[] calldata _addresses,uint256[] calldata _amounts) external{
        require(_addresses.length == _amounts.length,"addresses and amounts length mismatch");
        IERC20 token = IERC20(_token);
        uint256 totalAmount = getSum(_amounts);
        require(token.balanceOf(msg.sender) >= totalAmount,"insufficient balance");

        for(uint i = 0;i<_addresses.length;i++){
            token.transferFrom(msg.sender,_addresses[i],_amounts[i]);
        }
    }

     /// 向多个地址转账ETH
    function multiTransferETH(
        address payable[] calldata _addresses,
        uint256[] calldata _amounts
    ) public payable {
        // 检查：_addresses和_amounts数组的长度相等
        require(
            _addresses.length == _amounts.length,
            "Lengths of Addresses and Amounts NOT EQUAL"
        );
        uint _amountSum = getSum(_amounts); // 计算空投ETH总量
        // 检查转入ETH等于空投总量
        require(msg.value == _amountSum, "Transfer amount error");
        // for循环，利用transfer函数发送ETH
        for (uint256 i = 0; i < _addresses.length; i++) {
            // 注释代码有Dos攻击风险, 并且transfer 也是不推荐写法
            // Dos攻击 具体参考 https://github.com/AmazingAng/WTF-Solidity/blob/main/S09_DoS/readme.md
            // _addresses[i].transfer(_amounts[i]);
            (bool success, ) = _addresses[i].call{value: _amounts[i]}("");
            if (!success) {
                failTransferList[_addresses[i]] = _amounts[i];
            }
        }
    }

    // 给空投失败提供主动操作机会
    function withdrawFromFailList(address _to) public {
        uint failAmount = failTransferList[msg.sender];
        require(failAmount > 0, "You are not in failed list");
        failTransferList[msg.sender] = 0;
        (bool success, ) = _to.call{value: failAmount}("");
        require(success, "Fail withdraw");
    }


    // 数组求和函数
    function getSum(uint256[] calldata _arr) public pure returns (uint sum) {
        for (uint i = 0; i < _arr.length; i++) sum = sum + _arr[i];
    }
    
}

