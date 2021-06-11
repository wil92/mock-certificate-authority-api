const fs = require('fs');
const util = require("util");
const execLib = require('child_process');

const exec = util.promisify(execLib.exec);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);

const NEW_CERT_NAME = 'server-cert.pem';
const SERVER_PK = 'server-key.pem';

module.exports = async function generateTLSCert(csr) {
    await exec(`openssl x509 -req -in ${csr} -signkey ${SERVER_PK} -out ${NEW_CERT_NAME}`).then(e => e.stdout);
    const signCert = await readFile(NEW_CERT_NAME, 'utf8');

    await unlink(NEW_CERT_NAME);

    return signCert;
}
