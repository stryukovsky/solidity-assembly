//SPDX-License-Identifier: unlicense

pragma solidity ^0.8.0;

contract ContractInteractions {

    function getCodeSize() public pure returns(uint256 result) {
        assembly {
            result := codesize()
        }
    }

    function getCodeSizeAt(address addr) public view returns(uint256 result) {
        assembly {
            result := extcodesize(addr)
        }
    }

    function getSelfBalanceExpensiveWay() public {
        assembly {
            let a := balance(address())
        }
    }

    function getSelfBalanceCheapWay() public {
        assembly {
            let a := selfbalance()
        }
    }
}