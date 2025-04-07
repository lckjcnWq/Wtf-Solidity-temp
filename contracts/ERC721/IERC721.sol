// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC165.sol";

/**
 * @title ERC721标准非同质化代币接口
 * @dev 参考https://eips.ethereum.org/EIPS/eip-721实现
 */
interface IERC721 is IERC165 {
    /**
     * @dev 当NFT所有权从一个地址转移到另一个地址时触发
     * @param from 原始所有者地址
     * @param to 新的所有者地址
     * @param tokenId 被转移的代币ID
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    
    /**
     * @dev 当一个地址被授权管理特定NFT时触发
     * @param owner 代币所有者地址
     * @param approved 被授权的地址
     * @param tokenId 被授权管理的代币ID
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    
    /**
     * @dev 当一个所有者启用或禁用操作员权限时触发
     * @param owner 代币所有者地址
     * @param operator 被授权或解除授权的操作员地址
     * @param approved true表示授权，false表示撤销授权
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    
    /**
     * @dev 返回账户拥有的NFT数量
     * @param owner 查询余额的账户地址
     * @return balance 该账户拥有的NFT数量
     */
    function balanceOf(address owner) external view returns (uint256 balance);
    
    /**
     * @dev 返回特定NFT的所有者地址
     * @param tokenId 查询所有者的NFT ID
     * @return owner 该NFT的所有者地址
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);
    
    /**
     * @dev 授权另一个地址管理特定的NFT
     * @param to 被授权的地址
     * @param tokenId 授权管理的NFT ID
     */
    function approve(address to, uint256 tokenId) external;
    
    /**
     * @dev 获取被授权管理特定NFT的地址
     * @param tokenId 查询授权的NFT ID
     * @return operator 被授权管理该NFT的地址
     */
    function getApproved(uint256 tokenId) external view returns (address operator);
    
    /**
     * @dev 授权或撤销操作员管理调用者的所有NFT的权限
     * @param operator 被授权或撤销授权的操作员地址
     * @param approved true表示授权，false表示撤销授权
     */
    function setApprovalForAll(address operator, bool approved) external;
    
    /**
     * @dev 查询一个地址是否被授权管理特定所有者的所有NFT
     * @param owner 代币所有者地址
     * @param operator 查询授权状态的操作员地址
     * @return 如果操作员被授权管理所有者的所有NFT，返回true
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    
    /**
     * @dev 将NFT从一个地址转移到另一个地址
     * @param from 当前NFT所有者地址
     * @param to 接收NFT的新地址
     * @param tokenId 要转移的NFT ID
     */
    function transferFrom(address from, address to, uint256 tokenId) external;
    
    /**
     * @dev 安全地将NFT从一个地址转移到另一个地址
     * @param from 当前NFT所有者地址
     * @param to 接收NFT的新地址
     * @param tokenId 要转移的NFT ID
     */
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    
    /**
     * @dev 安全地将NFT从一个地址转移到另一个地址，并附带额外数据
     * @param from 当前NFT所有者地址
     * @param to 接收NFT的新地址
     * @param tokenId 要转移的NFT ID
     * @param data 附加数据，会在调用接收者的onERC721Received时传递
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
}
