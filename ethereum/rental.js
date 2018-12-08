import web3 from './web3';
import Rental from './build/Rental.json';

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Rental.interface),
        address
    );
};