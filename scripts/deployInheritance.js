// 导入必要的hardhat组件
const { ethers } = require("hardhat");

async function main() {
  console.log("开始部署并测试继承合约...");

  // 获取签名者账户
  const [deployer] = await ethers.getSigners();
  console.log("使用账户测试:", deployer.address);

  // 部署Yeye合约
  console.log("\n部署Yeye合约...");
  const Yeye = await ethers.getContractFactory("Yeye");
  const yeye = await Yeye.deploy();
  // ethers.js v6需要使用getAddress()方法
  console.log("Yeye合约已部署到:", await yeye.getAddress());

  // 部署Baba合约
  console.log("\n部署Baba合约...");
  const Baba = await ethers.getContractFactory("Baba");
  const baba = await Baba.deploy();
  console.log("Baba合约已部署到:", await baba.getAddress());

  // 部署Erzi合约
  console.log("\n部署Erzi合约...");
  const Erzi = await ethers.getContractFactory("Erzi");
  const erzi = await Erzi.deploy();
  console.log("Erzi合约已部署到:", await erzi.getAddress());

  // 为了捕获事件，定义一个辅助函数
  async function executeAndLogEvent(contractCall, actionName) {
    console.log(`调用${actionName}...`);
    const tx = await contractCall;
    const receipt = await tx.wait();
    
    // 在v6中，事件可能在logs数组中
    if (receipt.logs && receipt.logs.length > 0) {
      // 尝试解码事件
      try {
        const iface = new ethers.Interface(["event Log(string msg)"]);
        const decodedLog = iface.parseLog(receipt.logs[0]);
        console.log(`  事件消息: ${decodedLog.args[0]}`);
      } catch (e) {
        console.log(`  无法解码事件: ${e.message}`);
      }
    } else if (receipt.events && receipt.events.length > 0) {
      // 另一种方式尝试获取事件
      try {
        console.log(`  事件消息: ${receipt.events[0].args[0]}`);
      } catch (e) {
        console.log(`  无法访问事件参数: ${e.message}`);
      }
    } else {
      console.log(`  未捕获到事件`);
    }
  }

  console.log("\n======= 测试Yeye合约函数 =======");
  await executeAndLogEvent(yeye.hip(), "yeye.hip()");
  await executeAndLogEvent(yeye.pop(), "yeye.pop()");
  await executeAndLogEvent(yeye.yeye(), "yeye.yeye()");

  console.log("\n======= 测试Baba合约函数 =======");
  await executeAndLogEvent(baba.hip(), "baba.hip()");
  await executeAndLogEvent(baba.pop(), "baba.pop()");
  await executeAndLogEvent(baba.yeye(), "baba.yeye()");
  await executeAndLogEvent(baba.baba(), "baba.baba()");

  console.log("\n======= 测试Erzi合约函数 =======");
  await executeAndLogEvent(erzi.hip(), "erzi.hip()");
  await executeAndLogEvent(erzi.pop(), "erzi.pop()");
  await executeAndLogEvent(erzi.yeye(), "erzi.yeye()");
  await executeAndLogEvent(erzi.baba(), "erzi.baba()");

  console.log("\n======= 测试Erzi调用父合约函数 =======");
  await executeAndLogEvent(erzi.callParent(), "erzi.callParent()");
  await executeAndLogEvent(erzi.callParentSuper(), "erzi.callParentSuper()");

  console.log("\n继承合约测试完成！");
}

// 运行脚本
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("测试过程中发生错误:", error);
    console.error(error.stack || error);  // 打印完整错误堆栈
    process.exit(1);
  }); 