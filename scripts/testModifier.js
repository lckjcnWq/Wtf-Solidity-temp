// 测试Modifier合约的脚本
const { ethers } = require("hardhat");
const { expect } = require("chai");

async function main() {
  console.log("开始测试Modifier合约...");

  // 获取测试账户
  const [deployer, otherAccount, newOwner] = await ethers.getSigners();
  console.log("部署者地址:", deployer.address);
  console.log("其他测试账户:", otherAccount.address);
  console.log("新所有者地址:", newOwner.address);

  // 部署合约
  console.log("\n部署Modifier合约...");
  const ModifierFactory = await ethers.getContractFactory("Modifier");
  const modifierContract = await ModifierFactory.deploy(deployer.address);
  await modifierContract.waitForDeployment();
  
  const contractAddress = await modifierContract.getAddress();
  console.log("合约已部署到地址:", contractAddress);

  // 测试1: 检查初始所有者是否正确设置
  console.log("\n测试1: 检查初始所有者");
  const initialOwner = await modifierContract.owner();
  console.log("当前所有者:", initialOwner);
  if (initialOwner === deployer.address) {
    console.log("✅ 初始所有者设置正确");
  } else {
    console.log("❌ 初始所有者设置错误");
  }

  // 测试2: 测试非所有者调用changeOwner函数（应当失败）
  console.log("\n测试2: 非所有者尝试更改所有者（应当失败）");
  try {
    await modifierContract.connect(otherAccount).changeOwner(otherAccount.address);
    console.log("❌ 测试失败: 非所有者成功调用了changeOwner函数");
  } catch (error) {
    console.log("✅ 测试通过: 非所有者无法调用changeOwner函数");
    console.log("错误信息:", error.message.includes("Not owner") ? "Not owner" : error.message);
  }

  // 测试3: 测试所有者调用changeOwner函数（应当成功）
  console.log("\n测试3: 所有者更改所有权到新地址");
  try {
    await modifierContract.connect(deployer).changeOwner(newOwner.address);
    const newCurrentOwner = await modifierContract.owner();
    console.log("新的所有者地址:", newCurrentOwner);
    if (newCurrentOwner === newOwner.address) {
      console.log("✅ 所有权成功转移到新地址");
    } else {
      console.log("❌ 所有权转移失败");
    }
  } catch (error) {
    console.log("❌ 测试失败: 所有者无法调用changeOwner函数");
    console.log("错误信息:", error.message);
  }

  // 测试4: 测试原所有者失去权限（应当失败）
  console.log("\n测试4: 原所有者尝试再次更改所有者（应当失败）");
  try {
    await modifierContract.connect(deployer).changeOwner(deployer.address);
    console.log("❌ 测试失败: 原所有者仍然可以调用changeOwner函数");
  } catch (error) {
    console.log("✅ 测试通过: 原所有者已无法调用changeOwner函数");
    console.log("错误信息:", error.message.includes("Not owner") ? "Not owner" : error.message);
  }

  // 测试5: 测试新所有者拥有权限（应当成功）
  console.log("\n测试5: 新所有者尝试更改所有者");
  try {
    await modifierContract.connect(newOwner).changeOwner(deployer.address);
    const finalOwner = await modifierContract.owner();
    console.log("最终所有者地址:", finalOwner);
    if (finalOwner === deployer.address) {
      console.log("✅ 新所有者成功更改了所有权");
    } else {
      console.log("❌ 所有权更改失败");
    }
  } catch (error) {
    console.log("❌ 测试失败: 新所有者无法调用changeOwner函数");
    console.log("错误信息:", error.message);
  }

  console.log("\n所有测试完成!");
}

// 执行主函数并处理错误
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("测试过程中发生错误:", error);
    process.exit(1);
  }); 