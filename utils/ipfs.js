 const IPFS = require('ipfs-http-client');
 const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
 const getIpfsHash = (data) => {
    return new Promise((resolve, reject) => {
        ipfs.add(data, (error, result) => {
            if(error) {
                return reject(error);
            }
            resolve(result[0].hash);
        })
    });
 }

 const convertToImage = (hash) => {
    return new Promise((resolve, reject) => {
        ipfs.cat(hash, (error, result) => {
            if(error) {
                return reject(error);
            }
            resolve("data:image/jpeg;base64," + Buffer(result).toString('base64'));
        })
    });
 }

 const getString = (hash) => {
    return new Promise((resolve, reject) => {
        ipfs.cat(hash, (error, result) => {
            if(error) {
                return reject(error);
            }
            resolve(result.toString());
        })
    });
 }

 export {ipfs, getIpfsHash, convertToImage, getString};
