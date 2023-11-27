// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

contract Election {
    // Enum representing the possible states of the election
    enum State {
        BeforeElection,
        DuringElection,
        AfterElection
    }

    // Struct representing a candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Contract owner's address and current state of the election
    address public owner;
    State public electionState;

    // Struct representing a voter
    struct Voter {
        uint256 id;
        string name;
    }

    // Mapping to store candidate details using their IDs
    mapping(uint256 => Candidate) candidates;
    // Mapping to keep track of whether a voter has voted
    mapping(address => bool) hasVoted;
    // Mapping to check if an address is a registered voter
    mapping(address => bool) voterCheck;
    // Counts of candidates and voters
    uint256 public candidatesCount = 0;
    uint256 public votersCount = 0;

    // Contract constructor initializing owner and setting the initial state
    constructor() {
        owner = msg.sender;
        electionState = State.BeforeElection;
    }

    // Event emitted when a vote is cast
    event Voted(uint256 indexed tempCandidateId);

    // Function to start the election, restricted to the owner
    function startElection() public {
        require(msg.sender == owner);
        require(electionState == State.BeforeElection);
        electionState = State.DuringElection;
    }

    // Function to end the election, restricted to the owner
    function endElection() public {
        require(msg.sender == owner);
        require(electionState == State.DuringElection);
        electionState = State.AfterElection;
    }

    // Function to add a candidate, restricted to the owner and before the election starts
    function addCandidate(string memory tempName) public {
        require(owner == msg.sender, "Only owner can add candidates");
        require(
            electionState == State.BeforeElection,
            "Election has already started"
        );

        candidates[candidatesCount] = Candidate(candidatesCount, tempName, 0);
        candidatesCount++;
    }

    // Function to add a voter, restricted to the owner and before the election starts
    function addVoter(address voter_) public {
        require(owner == msg.sender, "Only owner can add voter");
        require(!voterCheck[voter_], "Voter already added");
        require(
            electionState == State.BeforeElection,
            "Voter can't be added after election started"
        );

        voterCheck[voter_] = true;
    }

    // Function to get the role of an address (owner, voter, or unauthorized)
    function getRole(address varCurrent) public view returns (uint256) {
        if (owner == varCurrent) {
            return 1;
        } else if (voterCheck[varCurrent]) {
            return 2;
        } else {
            return 3;
        }
    }

    // Function to allow a registered voter to cast a vote for a candidate
    function vote(uint256 tempCandidateId) public {
        require(
            electionState == State.DuringElection,
            "Election is not in progress"
        );
        require(voterCheck[msg.sender], "Non authorised user cannot vote");
        require(!hasVoted[msg.sender], "You have already voted");
        require(
            tempCandidateId >= 0 && tempCandidateId < candidatesCount,
            "Invalid candidate ID"
        );

        candidates[tempCandidateId].voteCount++;
        hasVoted[msg.sender] = true;

        // Emit the Voted event
        emit Voted(tempCandidateId);
    }

    // Function to get details of a candidate by their ID
    function getCandidateDetails(
        uint256 tempCandidateId
    ) public view returns (string memory, uint256) {
        require(
            tempCandidateId >= 0 && tempCandidateId < candidatesCount,
            "Invalid candidate ID"
        );
        return (
            candidates[tempCandidateId].name,
            candidates[tempCandidateId].voteCount
        );
    }
}
