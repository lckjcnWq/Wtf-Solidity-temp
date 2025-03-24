async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  
  // 等待部署完成
  await counter.waitForDeployment();
  
  // 获取合约地址
  const address = await counter.getAddress();
  console.log("Counter deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 