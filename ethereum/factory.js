import web3 from './web3';

import RentalFactory from './build/RentalFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xeC97E97aeAd5A2E9128B26331ED21754111C1bA8'
);

export default instance;