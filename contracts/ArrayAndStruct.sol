// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ArrayAndStruct{
    //固定长度的Array
    uint[8] array1;
    bytes1[5] array2;
    address[100] array3;

    //动态长度的Array
    uint[] array4;
    string[] array5;
    address[] array6;
    bytes array7;

    //初始化可变长度Array
    uint[] array8 = new uint[](5);
    bytes array9 = new bytes(9);

    //给可变长度数组赋值
    function initArray() external pure returns(uint[] memory){
        uint[] memory x = new uint[](3);
        x[0] = 1;
        x[1] = 3;
        x[2] = 4;
        return(x);
    }

    function arrayPush() public returns(uint[] memory){
        uint[2]  memory a = [uint(1),2];
        array4 = a ;
        array4.push(3);
        return array4;
    }
    
}

contract StructTypes{
    struct Student{
        uint256 id;
        uint256 score;
    }

    Student student;
    function initStudent1() external{
        Student storage _student =  student;
        _student.id = 11;
        _student.score = 100;
    }

    // 方法2:直接引用状态变量的struct
    function initStudent2() external{
        student.id = 1;
        student.score = 80;
    }
    
    // 方法3:构造函数式
    function initStudent3() external {
        student = Student(3, 90);
    }

    // 方法4:key value
    function initStudent4() external {
        student = Student({id: 4, score: 60});
    }
}
