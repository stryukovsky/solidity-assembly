//SPDX-License-Identifier: unlicense

pragma solidity ^0.8.0;

contract MemoryIndexation {

    function getMemoryArrayLength(uint256[] memory array) public pure returns(uint256 result) {
        assembly {
            result := mload(array)
        }
    }

    function iterateThroughMemoryArray(uint256[] memory array) public pure returns(uint256 sum) {
        assembly {
            let length := mload(array)
            array := add(array, 0x20)
            for 
            {let endPos := add(array, mul(0x20, length))}
            lt(array, endPos)
            {array := add(array, 0x20)}
            {
                sum := add(sum, mload(array))
            }
        }
    }

    function iterateReverseMemoryArray(uint256[] memory array) public pure returns(uint256 sum) {
        assembly {
            let length := mload(array)
            let end := add(array, mul(0x20, length))
            for {} gt(end, array) {end := sub(end, 0x20)}
            {
                sum := add(sum, mload(end))
            }

        }
    }

    function returnValueInAssembly(uint256 value) public pure returns(uint256) {
        assembly {
            mstore(0x00, value)
            return(0x00, 0x20)
        }
    }

}