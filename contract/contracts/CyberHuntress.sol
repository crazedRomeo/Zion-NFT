pragma solidity ^0.8.1;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Huntress is ERC721, Ownable, ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string public baseURI;
  uint256 public mintPrice = 500 ether;
  uint256 public mintLimit = 5;
  bool private _paused = false;

  event Mint(address indexed minter, uint256 count);
  event Paused(bool paused);
  event Unpaused(bool paused);
  event PriceChanged(uint256 price);
  event Withdraw(uint256 amount);

  constructor() ERC721 ("Cyber Huntresses NFT", "CHN") {
    
  }

  modifier whenNotPaused() {
    require(_paused == false, "Pausable: paused");
    _;
  }

  function pause() external onlyOwner {
    require(_paused == false, "Already paused");
    _paused = true;
    
    emit Paused(_paused);
  }

  function unpause() external onlyOwner {
    require(_paused == true, "Already unpaused");
    _paused = false;

    emit Unpaused(_paused);
  }

  function mint(uint256 count) public whenNotPaused nonReentrant payable {
    require(count > 0, "Must mint at least one");
    require(msg.value >= mintPrice * count, "Not enough ether to mint");
    require(balanceOf(msg.sender) + count <= mintLimit, "Cannot mint more than 5");

    for(uint256 i = 0; i < count; i ++) {
        _safeMint(msg.sender, _tokenIds.current());
        _tokenIds.increment();
    }
    
    emit Mint(msg.sender, count);
  }

  function setMintPrice(uint256 _mintPrice) public onlyOwner {
    mintPrice = _mintPrice;

    emit PriceChanged(_mintPrice);
  }

  function setBaseURI(string memory _uri) public onlyOwner {
    baseURI = _uri;
  }

  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }
  
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "Token does not exist");
    return string(abi.encodePacked(_baseURI(), Strings.toString(tokenId), ".json"));
  }

  function withdraw() external onlyOwner {
    uint256 amount = address(this).balance;
    (bool success, ) = msg.sender.call{value: address(this).balance}("");
    require(success, "Transfer failed.");

    emit Withdraw(amount);
  }
}