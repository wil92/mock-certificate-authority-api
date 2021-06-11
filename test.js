/*
openssl genrsa -out server-key.pem 1024
openssl req -new -key server-key.pem -out server-csr.pem
openssl x509 -req -in server-csr.pem -signkey server-key.pem -out server-cert.pem
*/
const generateTLSCert = require('./utils/sign-cert');
const saveCert = require('./utils/save-cert');
const removeCert = require('./utils/remove-cert');

const exampleCSR = "MIIBYDCCAQUCAQAwgaIxETAPBgNVBAsMCENoYXJnaW5nMSQwIgYDVQQKDBtEci4gSW5nLiBoIGMuIEYuIFBvcnNjaGUgQUcxEjAQBgNVBAcMCVN0dXR0Z2FydDEbMBkGA1UECAwSQmFkZW4tV3VlcnR0ZW1iZXJnMQswCQYDVQQGEwJERTEpMCcGA1UEAwwgREU5MTFFKkRFKjAwMDEzNiowMDAwMDA1KjAwMDAwMDEwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAStBI/fX8YXc28JOcOM7krFQq0V9F6LCn56oJ9YDZEYJ/f7Etd4lEEiwFP0GjWmZ/XAOwYPlX0fX8eGZM0CHWLRoAAwCgYIKoZIzj0EAwIDSQAwRgIhAJzJtrRpkAkSFNiOpKBQyRmeeRb/jjfo1OCR/WCDRD5DAiEAuQzNExv0GQIQaQOML43IyBl6schnN8wmDkdZy8DCs0Y=";
const fileName = 'server-csr_TMP.pem';

(async function() {
    await saveCert(fileName, exampleCSR);

    const res = await generateTLSCert(fileName);
    console.log(res);

    await removeCert(fileName);
})().then();
