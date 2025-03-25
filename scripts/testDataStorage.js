// 导入必要的库和工具函数
const { ethers } = require("hardhat");
const { formatUnits, formatEther } = ethers;
const { expect } = require("chai");

// 主测试函数
async function main() {
  console.log("开始测试 DataStorage 和 Variables 合约...");

  // 获取签名者账户
  const [deployer] = await ethers.getSigners();
  console.log("使用账户测试:", deployer.address);

  // 部署 DataStorage 合约
  console.log("\n部署 DataStorage 合约...");
  const DataStorage = await ethers.getContractFactory("DataStorage");
  const dataStorage = await DataStorage.deploy();
  console.log("DataStorage 合约已部署到:", dataStorage.address);

  // 测试 DataStorage 合约功能
  console.log("\n测试 DataStorage 合约功能:");
  
  // 测试初始状态
  const x0 = await dataStorage.x(0);
  const x1 = await dataStorage.x(1);
  const x2 = await dataStorage.x(2);
  console.log(`初始数组状态: [${x0}, ${x1}, ${x2}]`);
  
  // 测试 fCalldata 函数
  const testArray = [10, 20, 30];
  const calldataResult = await dataStorage.fCalldata(testArray);
  console.log(`fCalldata([10, 20, 30]) 返回:`, calldataResult);
  
  // 测试 fMemory 函数 - 使用明确的函数签名
  const memoryResult = await dataStorage["fMemory(uint256[])"](testArray);
  console.log(`fMemory([10, 20, 30]) 返回:`, memoryResult);
  
  // 测试 fStorage 函数
  console.log("\n执行 fStorage() 函数...");
  await dataStorage.fStorage();
  
  // 验证存储变化
  const newX0 = await dataStorage.x(0);
  const newX1 = await dataStorage.x(1);
  const newX2 = await dataStorage.x(2);
  console.log(`修改后数组状态: [${newX0}, ${newX1}, ${newX2}]`);
  
  // 测试 fMemory 函数 (不改变状态) - 使用明确的函数签名
  console.log("\n执行 fMemory() 函数...");
  await dataStorage["fMemory()"]();
  
  // 验证存储未变化
  const afterMemoryX0 = await dataStorage.x(0);
  const afterMemoryX1 = await dataStorage.x(1);
  const afterMemoryX2 = await dataStorage.x(2);
  console.log(`执行fMemory()后数组状态: [${afterMemoryX0}, ${afterMemoryX1}, ${afterMemoryX2}]`);
  
  // 部署 Variables 合约
  console.log("\n部署 Variables 合约...");
  const Variables = await ethers.getContractFactory("Variables");
  const variables = await Variables.deploy();
  console.log("Variables 合约已部署到:", variables.address);
  
  // 测试 Variables 合约功能
  console.log("\n测试 Variables 合约功能:");
  
  // 测试默认状态
  const initialX = await variables.x();
  const initialY = await variables.y();
  const initialZ = await variables.z();
  console.log(`初始状态: x=${initialX}, y=${initialY}, z="${initialZ}"`);
  
  // 测试 foo 函数
  console.log("\n执行 foo() 函数...");
  await variables.foo();
  
  // 验证状态变化
  const newVarX = await variables.x();
  const newVarY = await variables.y();
  const newVarZ = await variables.z();
  console.log(`状态变化: x=${newVarX}, y=${newVarY}, z="${newVarZ}"`);
  
  // 测试 bar 函数
  const barResult = await variables.bar();
  console.log(`bar() 函数返回:`, barResult.toString());
  
  // 测试 global 函数
  const globalResult = await variables.global();
  console.log(`global() 函数返回:`, {
    sender: globalResult[0],
    blockNumber: globalResult[1].toString(),
    dataLength: globalResult[2].length
  });
  
  // 测试单位转换函数
  console.log("\n测试单位转换函数:");
  
  const weiResult = await variables.weiUnit();
  console.log(`weiUnit() 返回:`, weiResult.toString(), "wei");
  
  const gweiResult = await variables.gweiUnit();
  // 使用直接导入的formatUnits函数
  console.log(`gweiUnit() 返回:`, gweiResult.toString(), "wei =", formatUnits(gweiResult, "gwei"), "gwei");
  
  const etherResult = await variables.etherUnit();
  // 使用直接导入的formatEther函数
  console.log(`etherUnit() 返回:`, etherResult.toString(), "wei =", formatEther(etherResult), "ether");
  
  // 测试时间单位
  console.log("\n测试时间单位函数:");
  
  const secondsResult = await variables.secondsUnit();
  console.log(`secondsUnit() 返回:`, secondsResult.toString(), "秒");
  
  // 对于BigNumber的操作，在ethers.js v6中也有变化
  // 使用Number转换或按需调整
  const minutesResult = await variables.minutesUnit();
  console.log(`minutesUnit() 返回:`, minutesResult.toString(), "秒 =", Number(minutesResult) / 60, "分钟");
  
  const hoursResult = await variables.hoursUnit();
  console.log(`hoursUnit() 返回:`, hoursResult.toString(), "秒 =", Number(hoursResult) / 3600, "小时");
  
  const daysResult = await variables.daysUnit();
  console.log(`daysUnit() 返回:`, daysResult.toString(), "秒 =", Number(daysResult) / 86400, "天");
  
  const weeksResult = await variables.weeksUnit();
  console.log(`weeksUnit() 返回:`, weeksResult.toString(), "秒 =", Number(weeksResult) / 604800, "周");
  
  console.log("\n测试完成！");
}

// 执行主函数并处理错误
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("测试过程中发生错误:", error);
    process.exit(1);
  }); 