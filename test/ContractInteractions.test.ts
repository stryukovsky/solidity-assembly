import { ethers } from "hardhat";
import { ContractInteractions } from "../typechain-types";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ContractInteractions", () => {
    let contract: ContractInteractions;
    let deployer: SignerWithAddress;

    before(async () => {
        contract = await (await ethers.getContractFactory("ContractInteractions")).deploy();
        deployer = (await ethers.getSigners())[0];
    });

    it("should give code size", async () => {
        const innerCodeSize = await contract.getCodeSize();
        const externalCodeSize = await contract.getCodeSizeAt(contract.address);
        expect(innerCodeSize).eq(externalCodeSize);
    });

    it("should provide cheaper self-balance", async () => {
        const senderBalanceBeforeExpensive = await ethers.provider.getBalance(await deployer.getAddress());
        await contract.getSelfBalanceExpensiveWay();

        const senderBalanceBeforeCheap = await ethers.provider.getBalance(await deployer.getAddress());
        const expensiveWayPrice = senderBalanceBeforeExpensive.sub(senderBalanceBeforeCheap);

        await contract.getSelfBalanceCheapWay();
        const senderBalanceAfterCheap =  await ethers.provider.getBalance(await deployer.getAddress());
        const cheapWayPrice = senderBalanceBeforeCheap.sub(senderBalanceAfterCheap);
        
        expect(expensiveWayPrice).gt(cheapWayPrice);
    });

});
