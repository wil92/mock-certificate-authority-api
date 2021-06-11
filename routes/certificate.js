const express = require('express');
const generateTLSCert = require('../utils/sign-cert');
const saveCert = require('../utils/save-cert');
const removeCert = require('../utils/remove-cert');

const router = express.Router();
const CSR_CERT = 'server-csr';

/* POST CSMS mock data */
router.post('/', (req, res, next) => {
    const {requestId, plainCsr, signature, signerCertChain} = req.body;

    const crsCertName = `${CSR_CERT}_${new Date().getTime()}.pem`;

    saveCert(crsCertName, plainCsr)
        .then(() => generateTLSCert(crsCertName))
        .then(newKey => {
            const buff = new Buffer(newKey);
            res.json({
                requestId,
                certificates: buff.toString('base64')
            });
        })
        .then(() => removeCert(crsCertName))
        .then(() => next());
});

module.exports = router;
