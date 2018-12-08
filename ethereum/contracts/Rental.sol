pragma solidity ^0.4.25;

contract RentalFactory {
    address[] public deployedRental;
    
    function createCampaign(string productName, string description, uint rentalFee, uint deposit, uint maxDuration) public {
        address newRental = new Rental(productName, description, rentalFee, deposit, maxDuration, msg.sender);
        deployedRental.push(newRental);
    }
    
    function getDeployedRentals() public view returns(address[]) {
        return deployedRental;
    }
}

contract Rental {

    // struct Image {
    //     string imageHash;
    //     string ipfsInfo;
    // }
    // Image[] public images;  //use ipfs for distributed file system

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
        if(state == State.IDLE) {
            return "IDLE";
        }else if(state == State.PUBLISHED) {
            return "PUBLISHED";
        } else if(state == State.RENTED) {
            return "RENTED";
        } else if(state == State.AWAITPAYMENT) {
            return "AWAITPAYMENT";
        } else if(state == State.DELETED) {
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

    function Rental (string _productName, string _description, uint _rentalFee, uint _deposit, uint _maxDuration, address _owner) public {
        productName = _productName;
        description = _description;
        rentalFee = _rentalFee;
        deposit = _deposit;
        maxDuration = _maxDuration;
        owner = _owner;
        state = State.IDLE;
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

    function rentItem() public restrictedToRenter inState(State.PUBLISHED) payable {
        require(msg.value == deposit);
        start = now;
        state = State.RENTED;
        renter = msg.sender;
    } 

    function chargeOverdueItem() public restrictedToOwner inState(State.RENTED) {
        uint rentingTime = now - start;
        require(rentingTime > maxDuration);
        state = State.DELETED;
        owner.transfer(this.balance);
    }

    function calculateFee() public returns (uint) {
        uint rentingTime = now - start;
        return rentingTime * rentalFee;
    }

    function reclaimItem() public restrictedToOwner inState(State.RENTED) {
        state = State.AWAITPAYMENT;
    }

    function returnItem() public restrictedToRenter inState(State.AWAITPAYMENT) payable {
        totalRentingFee = calculateFee();
        require(msg.value >= totalRentingFee);
        state = State.IDLE;
        uint change = totalRentingFee - msg.value;
        renter.transfer(change + deposit);
        owner.transfer(this.balance);
    }

}