 const IPFS = require('ipfs-http-client');
 const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
 const getIpfsHash = (buffer) => {
    return new Promise((resolve, reject) => {
        ipfs.add(buffer, (error, result) => {
            if(error) {
                return reject(error);
            }
            resolve(result[0].hash);
        })
    });
 }

 export {ipfs, getIpfsHash};
