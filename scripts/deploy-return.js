// 导入 hardhat 运行环境
const hre = require("hardhat");

async function main() {
  console.log("开始部署和测试 Return 合约...");
  
  // 获取签名者
  const [deployer] = await hre.ethers.getSigners();
  console.log("使用账户部署:", deployer.address);

  // 获取合约工厂
  const Return = await hre.ethers.getContractFactory("Return");
  console.log("准备部署合约...");
  
  // 部署合约
  const returnContract = await Return.deploy();
  
  // 等待合约部署完成
  // 根据 Hardhat 版本，以下方法可能不同
  if (returnContract.waitForDeployment) {
    await returnContract.waitForDeployment();
    console.log("Return 合约部署成功，地址:", await returnContract.getAddress());
  } else {
    await returnContract.deployed();
    console.log("Return 合约部署成功，地址:", returnContract.address);
  }
  
  // 获取合约地址
  const contractAddress = returnContract.address || await returnContract.getAddress();
  
  // 测试 returnMultiple 函数
  console.log("\n测试 returnMultiple 函数:");
  const multipleResult = await returnContract.returnMultiple();
  console.log("returnMultiple 返回值:");
  console.log("- 数字:", multipleResult[0].toString());
  console.log("- 布尔值:", multipleResult[1]);
  console.log("- 数组:", multipleResult[2].map(item => item.toString()));
  
  // 测试 returnName 函数
  console.log("\n测试 returnName 函数:");
  const namedResult = await returnContract.returnName();
  console.log("returnName 返回值:");
  console.log("- _number:", namedResult._number.toString());
  console.log("- _bool:", namedResult._bool);
  console.log("- _array:", namedResult._array.map(item => item.toString()));
  
  // 测试 returnNamed2 函数
  console.log("\n测试 returnNamed2 函数:");
  const named2Result = await returnContract.returnNamed2();
  console.log("returnNamed2 返回值:");
  console.log("- _number:", named2Result._number.toString());
  console.log("- _bool:", named2Result._bool);
  console.log("- _array:", named2Result._array.map(item => item.toString()));
  
  console.log("\n所有测试完成!");
}

// 运行脚本并处理错误
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 