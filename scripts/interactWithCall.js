// 使用 Hardhat 环境与 ethers.js v6 与 Call.sol 合约交互
const hre = require("hardhat");

async function main() {
  try {
    // 部署 OtherContractX 合约（已修改合约名称）
    console.log("正在部署 OtherContractX 合约...");
    const OtherContractX = await hre.ethers.getContractFactory("OtherContractX");
    const otherContractX = await OtherContractX.deploy();
    await otherContractX.waitForDeployment();
    const otherContractXAddress = await otherContractX.getAddress();
    console.log("OtherContractX 已部署到地址:", otherContractXAddress);

    // 部署 Call 合约
    console.log("正在部署 Call 合约...");
    const Call = await hre.ethers.getContractFactory("Call");
    const callContract = await Call.deploy();
    await callContract.waitForDeployment();
    const callContractAddress = await callContract.getAddress();
    console.log("Call 合约已部署到地址:", callContractAddress);
    
    // 获取签名者账户
    const [signer] = await hre.ethers.getSigners();
    console.log("使用测试账户:", await signer.getAddress());
    
    // 监听 Response 事件
    console.log("设置 Response 事件监听器...");
    callContract.on("Response", (success, data, event) => {
      console.log("收到 Response 事件:");
      console.log("  成功状态:", success);
      console.log("  返回数据:", data);
      console.log("  区块号:", event.blockNumber);
    });

    // 1. 调用 callSetX 函数
    console.log("\n调用 callSetX 函数...");
    const value = hre.ethers.parseEther("0.1"); // 发送0.1 ETH
    const tx1 = await callContract.callSetX(otherContractXAddress, 999, {
      value: value,
      gasLimit: 500000
    });
    console.log("交易已发送，哈希值:", tx1.hash);
    await tx1.wait();
    
    // 检查 OtherContractX 的余额
    const balance = await otherContractX.getBalance();
    console.log("OtherContractX 余额:", hre.ethers.formatEther(balance), "ETH");
    
    // 2. 调用 callGetX 函数
    console.log("\n调用 callGetX 函数...");
    const tx2 = await callContract.callGetX(otherContractXAddress);
    const receipt2 = await tx2.wait();
    console.log("交易已确认，区块号:", receipt2.blockNumber);
    
    // 解码返回值
    // 注意：我们需要从事件日志中获取返回值，或者通过函数的返回值
    try {
      const result = await callContract.callGetX.staticCall(otherContractXAddress);
      console.log("getX 返回值:", result.toString());
    } catch (error) {
      console.log("获取 getX 返回值失败:", error.message);
    }
    
    // 3. 调用 callNonExist 函数（调用不存在的函数）
    console.log("\n调用 callNonExist 函数（测试调用不存在的函数）...");
    const tx3 = await callContract.callNonExist(otherContractXAddress);
    await tx3.wait();
    
    // 保持脚本运行一段时间以监听事件
    console.log("\n正在监听事件，将持续 30 秒...");
    await new Promise(resolve => setTimeout(resolve, 30000)); // 等待30秒
    
  } catch (error) {
    console.error("发生错误:", error);
  }
}

// 执行主函数
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 