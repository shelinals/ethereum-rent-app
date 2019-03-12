import web3 from './web3';

import RentalFactory from './build/RentalFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(RentalFactory.interface),
    '0xa0e3433c9C70fA9676B086356FAECe55E8235326'
);

export default instance;