import { ethers } from "hardhat";
import { MemoryIndexation } from "../typechain-types";
import { expect } from "chai";


describe("MemoryIndexation", () => {
    let contract: MemoryIndexation;
    const array = [1, 2, 3, 4, 5];


    before(async () => {
        contract = await (await ethers.getContractFactory("MemoryIndexation")).deploy();
    });

    it("should return the same value as first parameter", async () => {
        const value = await contract.getMemoryArrayLength(array);
        expect(value).eq(5);
    });

    it("should calculate sum of the array", async () => {
        const value = await contract.iterateThroughMemoryArray(array);
        expect(value).eq(15);
    });

    it("should iterate backwards array and receive the same result", async () => {
        const value = await contract.iterateReverseMemoryArray(array);
        expect(value).eq(15);
    });

    it("should return value", async() => {
        const expected = 5;
        const actual = await contract.returnValueInAssembly(expected);
        expect(expected).eq(actual);
    });
});
