// 导入 hardhat 运行环境
const hre = require("hardhat");

async function main() {
  console.log("开始部署和测试 FunctionTypes 合约...");
  
  // 获取签名者
  const [deployer] = await hre.ethers.getSigners();
  console.log("使用账户部署:", deployer.address);

  // 获取合约工厂
  const FunctionTypes = await hre.ethers.getContractFactory("FunctionTypes");
  console.log("准备部署合约...");
  
  // 部署合约，并发送1 ETH
  // 根据你的 Hardhat 版本，以下代码可能需要调整
  const ethValue = hre.ethers.parseEther ? 
                   hre.ethers.parseEther("1.0") : 
                   hre.ethers.utils.parseEther("1.0");
  
  const functionTypes = await FunctionTypes.deploy({value: ethValue});
  
  // 等待合约部署完成
  // 根据 Hardhat 版本，以下方法可能不同
  if (functionTypes.waitForDeployment) {
    await functionTypes.waitForDeployment();
    console.log("FunctionTypes 合约部署成功，地址:", await functionTypes.getAddress());
  } else {
    await functionTypes.deployed();
    console.log("FunctionTypes 合约部署成功，地址:", functionTypes.address);
  }
  
  // 获取合约地址
  const contractAddress = functionTypes.address || await functionTypes.getAddress();
  
  // 测试 number 的初始值
  let number = await functionTypes.number();
  console.log("初始 number 值:", number.toString());
  
  // 测试 add 函数
  console.log("\n测试 add 函数:");
  let tx = await functionTypes.add();
  await tx.wait();
  number = await functionTypes.number();
  console.log("执行 add 后 number 的值:", number.toString());
  
  // 测试 addPure 函数
  console.log("\n测试 addPure 函数:");
  const pureResult = await functionTypes.addPure(10);
  console.log("addPure(10) 返回值:", pureResult.toString());
  
  // 测试 addView 函数
  console.log("\n测试 addView 函数:");
  const viewResult = await functionTypes.addView();
  console.log("addView() 返回值:", viewResult.toString());
  console.log("注意：addView 不改变状态，number 仍为:", (await functionTypes.number()).toString());
  
  // 测试 minusCall 函数 (通过它间接调用内部的 minus 函数)
  console.log("\n测试 minusCall 函数 (调用内部 minus 函数):");
  tx = await functionTypes.minusCall();
  await tx.wait();
  number = await functionTypes.number();
  console.log("执行 minusCall 后 number 的值:", number.toString());
  
  // 测试 minusPayable 函数，并发送一些 ETH
  console.log("\n测试 minusPayable 函数 (并发送 0.1 ETH):");
  const payableValue = hre.ethers.parseEther ? 
                       hre.ethers.parseEther("0.1") : 
                       hre.ethers.utils.parseEther("0.1");
                       
  tx = await functionTypes.minusPayable({value: payableValue});
  const receipt = await tx.wait();
  number = await functionTypes.number();
  console.log("执行 minusPayable 后 number 的值:", number.toString());
  
  // 尝试获取 minusPayable 的返回值
  try {
    const result = await functionTypes.minusPayable({value: payableValue});
    console.log("minusPayable 返回的余额:", result.toString());
  } catch (e) {
    console.log("获取返回值时出错:", e.message);
  }
  
  // 检查合约余额
  const balance = await hre.ethers.provider.getBalance(contractAddress);
  const formatEther = hre.ethers.formatEther || hre.ethers.utils.formatEther;
  console.log("合约余额:", formatEther(balance), "ETH");
}

// 执行脚本
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("部署或测试过程中出错:", error);
    process.exit(1);
  }); 