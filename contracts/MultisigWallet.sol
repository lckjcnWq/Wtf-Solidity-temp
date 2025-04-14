// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// 基于签名的多签钱包，由gnosis safe合约简化而来，教学使用。
contract MultisigWallet{
    event ExecutionSuccess(bytes32 txHash);    // 交易成功事件
    event ExecutionFailure(bytes32 txHash);    // 交易失败事件
    address[] public owners;                   // 多签持有人数组 
    mapping(address => bool) public isOwner;   // 记录一个地址是否为多签
    uint256 public ownerCount;                 // 多签持有人数量
    uint256 public threshold;                  // 多签执行门槛，交易至少有n个多签人签名才能被执行。
    uint256 public nonce;                      // nonce，防止签名重放攻击
    
    // 构造函数，初始化多签持有人和门槛
    constructor(address[] memory _owners, uint256 _threshold) {
        require(_owners.length > 0, "多签持有人不能为空");
        require(_threshold > 0 && _threshold <= _owners.length, "门槛必须大于0且小于等于持有人数量");
        
        for(uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "无效的持有人地址");
            require(!isOwner[owner], "持有人地址重复");
            
            isOwner[owner] = true;
            owners.push(owner);
        }
        
        ownerCount = _owners.length;
        threshold = _threshold;
    }
    
    // 接收ETH
    receive() external payable {}
    
    // 获取交易哈希
    function getTransactionHash(
        address to,
        uint256 value,
        bytes memory data,
        uint256 _nonce
    ) public view returns (bytes32) {
        return keccak256(abi.encode(to, value, keccak256(data), _nonce));
    }
    
    // 验证签名
    function isValidSignature(bytes32 txHash, bytes memory signature) internal view returns (address) {
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", txHash));
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(signature);
        address signer = ecrecover(ethSignedHash, v, r, s);
        require(isOwner[signer], "签名者不是持有人");
        return signer;
    }
     
    // 分割签名
    function splitSignature(bytes memory sig) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        require(sig.length == 65, "签名长度错误");
        
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        
        return (v, r, s);
    }
    
    // 执行交易
    function executeTransaction(
        address to,
        uint256 value,
        bytes memory data,
        bytes[] memory signatures
    ) public returns (bool success) {
        require(signatures.length >= threshold, "签名数量不足");
        
        bytes32 txHash = getTransactionHash(to, value, data, nonce);
        nonce++;
        
        // 验证签名
        address[] memory signers = new address[](signatures.length);
        for (uint256 i = 0; i < signatures.length; i++) {
            address signer = isValidSignature(txHash, signatures[i]);
            // 确保没有重复签名
            for (uint256 j = 0; j < i; j++) {
                require(signer != signers[j], "重复的签名");
            }
            signers[i] = signer;
        }
        
        // 执行交易
        (success, ) = to.call{value: value}(data);
        
        if (success) {
            emit ExecutionSuccess(txHash);
        } else {
            emit ExecutionFailure(txHash);
        }
    }
}
