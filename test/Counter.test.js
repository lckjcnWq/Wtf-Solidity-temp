const { expect } = require("chai");

describe("Counter", function () {
  let counter;
  let owner;

  beforeEach(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    [owner] = await ethers.getSigners();
  });

  it("Should start with count of 0", async function () {
    expect(await counter.current()).to.equal(0);
  });

  it("Should increment counter", async function () {
    await counter.increment();
    expect(await counter.current()).to.equal(1);
  });

  it("Should decrement counter", async function () {
    await counter.increment();
    await counter.decrement();
    expect(await counter.current()).to.equal(0);
  });

  it("Should fail when decrementing at 0", async function () {
    await expect(counter.decrement()).to.be.revertedWith(
      "Counter: cannot decrement below zero"
    );
  });

  it("Should emit event on count change", async function () {
    await expect(counter.increment())
      .to.emit(counter, "CountChanged")
      .withArgs(1);
  });
}); 