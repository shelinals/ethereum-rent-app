/* 
    runtime:
    delete entire 'build' folder
    read 'Rental.sol' from the 'contracts' folder
    compile both contracts with solidity compiler
    write output to the 'build' directory
*/

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); //improved version of fs module

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Rental.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);    //ensure directory exist, if not create one

for(let contract in output) {
    fs.outputJsonSync(          //write json file (path, data)
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}