const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/RentalFactory.json');

// const provider = new HDWalletProvider(
//     'rally three arrest upper zone flat family water enact napkin stand only',
//     'https://rinkeby.infura.io/v3/d928a9c204db4d418b536b7dbcf89977'
// ); //mneumonic can specify many accounts

const provider = new HDWalletProvider(
    'rally three arrest upper zone flat family water enact napkin stand only',
    'https://ropsten.infura.io/v3/d928a9c204db4d418b536b7dbcf89977'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '6500000', gasPrice: web3.utils.toWei('15', 'gwei') });

    console.log('Contract deployed to ', result.options.address);
};
deploy();