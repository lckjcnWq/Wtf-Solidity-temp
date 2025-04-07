// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @dev ERC165标准接口, 详见
 * https://eips.ethereum.org/EIPS/eip-165[EIP].
 *
 * 合约可以声明支持的接口，供其他合约检查
 *

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
