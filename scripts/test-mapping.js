// 导入所需的Hardhat模块
const hre = require("hardhat");

async function main() {
  console.log("开始测试Mapping合约...");

  // 获取部署者账户
  const [deployer, addr1, addr2] = await hre.ethers.getSigners();
  console.log("使用部署者账户地址:", deployer.address);

  // 部署Mapping合约
  const Mapping = await hre.ethers.getContractFactory("Mapping");
  const mapping = await Mapping.deploy();
  
  // 使用与deploy-return.js相同的部署确认方法
  // 兼容不同版本的Hardhat
  if (mapping.waitForDeployment) {
    await mapping.waitForDeployment();
    console.log("Mapping合约已部署到地址:", await mapping.getAddress());
  } else {
    await mapping.deployed();
    console.log("Mapping合约已部署到地址:", mapping.address);
  }
  
  // 获取合约地址（兼容不同版本）
  const contractAddress = mapping.address || await mapping.getAddress();

  // 测试writeMap函数 - 写入一个映射值
  const id1 = 1;
  console.log(`向idToAddress映射写入: [${id1}] = ${addr1.address}`);
  const tx1 = await mapping.writeMap(id1, addr1.address);
  await tx1.wait();

  // 测试映射读取功能
  const savedAddress = await mapping.idToAddress(id1);
  console.log(`从idToAddress映射读取: [${id1}] = ${savedAddress}`);
  console.log(`验证映射值是否正确: ${savedAddress === addr1.address ? "✅ 成功" : "❌ 失败"}`);

  // 测试第二个映射值
  const id2 = 42;
  console.log(`向idToAddress映射写入: [${id2}] = ${addr2.address}`);
  const tx2 = await mapping.writeMap(id2, addr2.address);
  await tx2.wait();

  const savedAddress2 = await mapping.idToAddress(id2);
  console.log(`从idToAddress映射读取: [${id2}] = ${savedAddress2}`);
  console.log(`验证映射值是否正确: ${savedAddress2 === addr2.address ? "✅ 成功" : "❌ 失败"}`);

  // 检查swapPair映射 (注意：当前合约没有提供设置此映射的功能)
  const pairAddress = await mapping.swapPair(deployer.address);
  console.log(`从swapPair映射读取: [${deployer.address}] = ${pairAddress}`);
  console.log("注意: 合约中没有提供设置swapPair映射的函数，因此上面的值应该是默认值");

  console.log("Mapping合约测试完成！");
}

// 处理脚本执行中的错误
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("测试期间发生错误:", error);
    process.exit(1);
  }); 