// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19; 

interface IERC721Receiver {
    /**
     * @dev 当{IERC721}代币被转移到实现该接口的合约时，会调用此函数
     * @param operator 调用safeTransferFrom函数的地址
     * @param from 代币的原始所有者
     * @param tokenId 转移的代币ID
     * @param data 额外的数据，无特殊要求
     * @return 函数选择器，必须为`IERC721Receiver.onERC721Received.selector`
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

