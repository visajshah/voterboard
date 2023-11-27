// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
    // Address of the owner of the contract
    address public owner = msg.sender;

    // Variable to store the last completed migration
    uint public last_completed_migration;

    // Modifier to restrict access to certain functions to the contract owner
    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    // Function to set the last completed migration, restricted to the owner
    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }
}
