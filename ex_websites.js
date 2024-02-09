//Change file name to "websites.js" for import to correctly work
//Declare your websites here
const fs = require('fs');

const websites = {
    'example.com': '/path/to/example.com/files',
    'www.example2.com': '/path/to/example2.com/files'
};

const certDir = '/etc/letsencrypt/live';

const certConfig = {
    'example.com': {
        key: fs.readFileSync(`${certDir}/example.com/privkey.pem`),
        cert: fs.readFileSync(`${certDir}/example.com/fullchain.pem`)
    },
    'example2.com': {
        key: fs.readFileSync(`${certDir}/example2.com/privkey.pem`),
        cert: fs.readFileSync(`${certDir}/example2.com/fullchain.pem`)
    }
    // Add more SSL certificate configurations for other domains
};
module.exports = websites;