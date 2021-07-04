const fs = require('fs');
const util = require("util");
const execLib = require('child_process');

const exec = util.promisify(execLib.exec);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);

const NEW_CERT_NAME = 'server-cert.pem';
const NEW_CERT_NAME_P7 = 'server-cert.p7b';
const SERVER_PK = 'server-key.pem';

module.exports = async function generateTLSCert(csr) {
    await exec(`openssl x509 -req -in ${csr} -signkey ${SERVER_PK} -out ${NEW_CERT_NAME}`);

    await exec(`openssl crl2pkcs7 -nocrl -certfile ${NEW_CERT_NAME} -out ${NEW_CERT_NAME_P7}`);

    const signCert = await readFile(NEW_CERT_NAME_P7, 'utf8');

    await unlink(NEW_CERT_NAME);
    await unlink(NEW_CERT_NAME_P7);

    return signCert;
}
