const fs = require('fs');
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

function formatCSR(plainCsr) {
    return plainCsr.match(/.{1,64}/g).reduce((p, c) => p + c + '\n', '');
}

module.exports = async function (crsCertName, plainCsr) {
    const result = `-----BEGIN CERTIFICATE REQUEST-----\n${formatCSR(plainCsr)}-----END CERTIFICATE REQUEST-----\n`
    await writeFile(crsCertName, result);
}
