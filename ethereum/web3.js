import Web3 from 'web3';

//assume user has metamask
// const web3 = new Web3(window.web3.currentProvider); // cannot do with next because cannot see "window" from server

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //We are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
}else {
    //We are on the server OR the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/v3/d928a9c204db4d418b536b7dbcf89977'
    );
    web3 = new Web3(provider);
}

export default web3;