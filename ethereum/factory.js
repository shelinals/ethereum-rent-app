import web3 from './web3';

import RentalFactory from './build/RentalFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(RentalFactory.interface),
    '0xDb57a84C092827F7d67a38C44731402396995E38'
);

export default instance;