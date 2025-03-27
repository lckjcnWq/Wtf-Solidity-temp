// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Yeye{

    event Log(string msg);

    function hip() public virtual{
        emit Log("Yeye hip");
    }

    function pop() public virtual{
        emit Log("Yeye pop");
    }

    function yeye() public virtual{
        emit Log("Yeye yeye");
    }
    
}

contract Baba is Yeye{
    function hip() public  virtual override{
        emit Log("Baba hip");
    }

    function pop() public virtual override{
        emit Log("Baba pop");
    }

    function baba() public virtual{
        emit Log("Baba baba");
    }
}

contract Erzi is Yeye, Baba{
    // 继承两个function: hip()和pop()，输出改为Erzi。
    function hip() public virtual override(Yeye, Baba){
        emit Log("Erzi hip");
    }

    function pop() public virtual override(Yeye, Baba) {
        emit Log("Erzi pop");
    }

    function callParent() public{
        Yeye.pop();
    }

    function callParentSuper() public{
        super.pop();
    }
}
