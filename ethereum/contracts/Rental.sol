pragma solidity ^0.4.25;

contract RentalFactory {
    address[] public deployedRental;
    mapping(address => address) public owners;
    
    function createRental(string productName, string description, uint rentalFee, uint deposit, uint maxDuration, bool publish, string imageHashes) public {
        address newRental = new Rental(productName, description, rentalFee, deposit, maxDuration, publish, msg.sender, imageHashes);
        deployedRental.push(newRental);

        if(owners[msg.sender] == 0) {
            address profile = new Profile(msg.sender);
            owners[msg.sender] = profile;
        }
    }

    function getProfile(address _owner) public returns(address) {
        require(owners[_owner] != 0);
        return owners[_owner];
    }
    
    function getDeployedRentals() public view returns(address[]) {
        return deployedRental;
    }
}

contract Rental {

    string public imageHashes;

    struct Dispute {
        string title;
        string description;
        string imageHash;
        address disputer;
        bool complete;
        uint approvalCount;
        uint rejectionCount;
        uint startTime;
        mapping(address => bool) approvals;
        mapping(address => bool) rejections;
    }

    Dispute[] public disputes;
    uint public disputeCounts;
    bool public openDispute;
    
    string public productName;
    string public description;
    uint public rentalFee;
    uint public deposit;
    uint public maxDuration;
    address public owner;
    address public renter;

    uint public start;
    uint public totalRentingFee;

    enum State { IDLE, PUBLISHED, RENTED, AWAITPAYMENT, DELETED }
    State public state;

    function getState() public view returns (string) {
        if (state == State.IDLE) {
            return "IDLE";
        }else if (state == State.PUBLISHED) {
            return "PUBLISHED";
        } else if (state == State.RENTED) {
            return "RENTED";
        } else if (state == State.AWAITPAYMENT) {
            return "AWAITPAYMENT";
        } else if (state == State.DELETED) {
            return "DELETED";
        }
    }

    modifier restrictedToOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier restrictedToRenter() {
        require(msg.sender == renter);
        _;
    }

    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    function Rental (string _productName, string _description, uint _rentalFee, uint _deposit, uint _maxDuration, bool _publish, address _owner, string _imageHashes) public {
        productName = _productName;
        description = _description;
        rentalFee = _rentalFee;
        deposit = _deposit;
        maxDuration = _maxDuration;
        owner = _owner;
        imageHashes = _imageHashes;
        state = _publish? State.PUBLISHED : State.IDLE;
    }

    function getSummary() public view returns (
        string, string, uint, uint, uint, address, address
    ) {
        return(
            productName,
            description,
            rentalFee,
            deposit,
            maxDuration,
            owner,
            renter
        );
    }

    function getTime() public view returns (uint, uint, uint) {
        return(
            start,
            now,
            maxDuration
        );
    }

    function cancelled() public restrictedToOwner inState(State.PUBLISHED) {
        state = State.IDLE;
    }

    function publish() public restrictedToOwner inState(State.IDLE) {
        state = State.PUBLISHED;
    }

    function deleted() public restrictedToOwner {
        state = State.DELETED;
    }

    function rentItem() public inState(State.PUBLISHED) payable {
        require(msg.sender != owner);
        require(msg.value == deposit);
        start = now;
        state = State.RENTED;
        renter = msg.sender;
    } 

    function chargeOverdueItem() public restrictedToOwner inState(State.RENTED) {
        uint rentingTime = now - start;
        require(!openDispute);
        require(rentingTime > maxDuration);
        state = State.DELETED;
        owner.transfer(this.balance);
    }

    function allowOverdue() public returns (bool) {
        if(openDispute) {
            return false;
        }
        uint rentingTime = now - start;
        return rentingTime > maxDuration;
    }

    function calculateFee() public returns (uint) {
        uint rentingTime = now - start;
        return rentingTime * rentalFee;
    }

    //change calculation of fee here
    function reclaimItem() public restrictedToOwner inState(State.RENTED) {
        totalRentingFee = calculateFee();
        state = State.AWAITPAYMENT;
    }

    function returnItem() public restrictedToRenter inState(State.AWAITPAYMENT) payable {
        require(msg.value >= totalRentingFee);
        if(openDispute) {
            Dispute storage dispute = disputes[disputeCounts - 1];
            openDispute = false;
            dispute.complete = true;
        }
        state = State.IDLE;
        uint change = totalRentingFee - msg.value;
        renter.transfer(change + deposit);
        owner.transfer(this.balance);
    }

    function createDispute(string _title, string _description, string _imageHash) public restrictedToRenter inState(State.RENTED) {
        Dispute memory newDispute = Dispute({
           title: _title,
           description: _description,
           imageHash: _imageHash,
           disputer: msg.sender,
           complete: false,
           approvalCount: 0,
           rejectionCount: 0,
           startTime: now
        }); 
        
        openDispute = true;
        disputes.push(newDispute);
        disputeCounts++;
    }

    //incentives for voters

    function hasVoted(address voter) public returns(bool) {
        Dispute storage dispute = disputes[disputeCounts - 1];
        if (dispute.approvals[voter] || dispute.rejections[voter]) {
            return true;
        }
        return false;
    }

    function approveDispute(uint index) public {
        Dispute storage dispute = disputes[index];
        
        require(!dispute.approvals[msg.sender]); 
        require(!dispute.rejections[msg.sender]);
        
        dispute.approvals[msg.sender] = true;
        dispute.approvalCount++;
    }

    function rejectDispute(uint index) public {
        Dispute storage dispute = disputes[index];
        
        require(!dispute.approvals[msg.sender]); 
        require(!dispute.rejections[msg.sender]);
        
        dispute.rejections[msg.sender] = true;
        dispute.rejectionCount++;
    }

    function finalizeDisputeFee(uint index) public returns (uint) {
        Dispute storage dispute = disputes[index];
        uint rentingTime = dispute.startTime - start;
        totalRentingFee = rentingTime * rentalFee;
        return rentingTime * rentalFee;
    }

    function finalizeRequest(uint index) public payable {
        //can only be done by owner or renter
        Dispute storage dispute = disputes[index];
        uint duration = now - dispute.startTime;

        //what happens if same
        require(dispute.approvalCount != dispute.rejectionCount);
        require(!dispute.complete);
        require(duration > 1 weeks);

        openDispute = false;
        dispute.complete = true;

        if (dispute.approvalCount > dispute.rejectionCount) {
            require(msg.value >= totalRentingFee);
            state = State.IDLE;
            uint change = totalRentingFee - msg.value;
            renter.transfer(change + deposit);
            owner.transfer(this.balance);
        }
        
        if(dispute.approvalCount < dispute.rejectionCount) {
            state = State.DELETED;
            owner.transfer(this.balance);
        }
    }

}

contract Profile {

    struct Rating {
        uint rate;
        address rater;
        string comment;
        address productId;
    }

    Rating[] public ratings;
    uint public ratingCounts;

    address public owner;

    modifier restricted(){
        require(msg.sender != owner);
        _;  
    }

    function Profile (address _owner) public {
        owner = _owner;
    }

    //change rater to message.sender
    function inputRating(uint _rate, address _rater, string _comment, address _productId) public restricted {
        Rating memory newRating = Rating({
            rate: _rate,
            rater: _rater,
            comment: _comment,
            productId: _productId
        });

        ratings.push(newRating);
        ratingCounts++;
    }

    function getSumRating() public returns(uint) {
        uint sum = 0;
        for(uint i=0;i<ratingCounts;i++) {
            sum += ratings[i].rate;
        }
        return sum;
    }
}
