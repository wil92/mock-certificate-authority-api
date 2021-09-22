const path = require('path');
const express = require('express');
const generateTLSCert = require('../utils/sign-cert');
const saveCert = require('../utils/save-cert');
const removeCert = require('../utils/remove-cert');

const router = express.Router();
const CSR_CERT = 'server-csr';

async function processReq(req, res) {
    const {requestId, plainCsr, signature, signerCertChain} = req.body;

    const crsCertName = `${CSR_CERT}_${new Date().getTime()}.pem`;

    await saveCert(crsCertName, plainCsr);
    let newKey = await generateTLSCert(crsCertName);
    newKey = newKey.replace(/(\r\n|\n|\r)/gm, "");
    newKey = newKey.substr("-----BEGIN PKCS7-----".length);
    newKey = newKey.substr(0, newKey.indexOf("-----END PKCS7-----"));
    res.json({
        requestId,
        certificates: newKey
    });
    removeCert(crsCertName);
}

/* POST CSMS mock data */
router.post('/pnc/cpoca/porsche-cpo/certificate/v1/ocpp-client/plain', async (req, res) => {
    await processReq(req, res);
});

router.post('/pnc/cpoca/porsche-cpo/certificate/v1/secc-leaf/plain', async (req, res) => {
    await processReq(req, res);
});

router.post('/ocsp', async (req, res) => {
    const pathToFile = path.join(__dirname, '../test-cert.crt');
    console.log(pathToFile);
    res.sendFile(pathToFile);
});

module.exports = router;
