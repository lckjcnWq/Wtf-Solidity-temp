// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Return {
    
        function returnMultiple() public pure returns(uint256, bool, uint256[3] memory){
                return (1, true, [uint256(1),2,6]);
        }

        function returnName() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
                _number = 1;
                _bool = true;
                _array = [uint256(1),2,5];
        }


        // 命名式返回，依然支持return
    function returnNamed2() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
        return(1, true, [uint256(1),2,7]);
    }

    // 读取返回值，解构式赋值
    function readReturn() public pure{
        // 读取全部返回值
        uint256 _number;
        bool _bool;
        bool _bool2;
        uint256[3] memory _array;
        (_number, _bool, _array) = returnName();
        
        // 读取部分返回值，解构式赋值
        (, _bool2, ) = returnName();
    }

} 