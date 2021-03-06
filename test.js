/*
openssl genrsa -out server-key.pem 1024
openssl req -new -key server-key.pem -out server-csr.pem
openssl x509 -req -in server-csr.pem -signkey server-key.pem -out server-cert.pem
*/
// const generateTLSCert = require('./utils/sign-cert');
// const saveCert = require('./utils/save-cert');
// const removeCert = require('./utils/remove-cert');
//
// const exampleCSR = "MIIBYDCCAQUCAQAwgaIxETAPBgNVBAsMCENoYXJnaW5nMSQwIgYDVQQKDBtEci4gSW5nLiBoIGMuIEYuIFBvcnNjaGUgQUcxEjAQBgNVBAcMCVN0dXR0Z2FydDEbMBkGA1UECAwSQmFkZW4tV3VlcnR0ZW1iZXJnMQswCQYDVQQGEwJERTEpMCcGA1UEAwwgREU5MTFFKkRFKjAwMDEzNiowMDAwMDA1KjAwMDAwMDEwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAStBI/fX8YXc28JOcOM7krFQq0V9F6LCn56oJ9YDZEYJ/f7Etd4lEEiwFP0GjWmZ/XAOwYPlX0fX8eGZM0CHWLRoAAwCgYIKoZIzj0EAwIDSQAwRgIhAJzJtrRpkAkSFNiOpKBQyRmeeRb/jjfo1OCR/WCDRD5DAiEAuQzNExv0GQIQaQOML43IyBl6schnN8wmDkdZy8DCs0Y=";
// const fileName = 'server-csr_TMP.pem';
//
// (async function() {
//     await saveCert(fileName, exampleCSR);
//
//     const res = await generateTLSCert(fileName);
//     console.log(res);
//
//     await removeCert(fileName);
// })().then();

// test create file with bytes data
const fs = require('fs');
const buffer = require('buffer');
const OCSPResponse = `00000000  30 82 01 C2 0A 01 00 A0 82 01 BB 30 82 01 B7 06    0..Â... ..»0..·.
00000010  09 2B 06 01 05 05 07 30 01 01 04 82 01 A8 30 82    .+.....0.....¨0.
00000020  01 A4 30 2B A2 16 04 14 27 67 85 1E 4D 88 E4 87    .¤0+¢...'g..M.ä.
00000030  14 EF 2C 32 9B 19 8D BA 5D 4E 03 C7 18 0F 32 30    .ï,2...º]N.Ç..20
00000040  32 31 30 39 32 32 31 34 34 39 33 33 5A 30 00 30    210922144933Z0.0
00000050  0A 06 08 2A 86 48 CE 3D 04 03 02 03 49 00 30 46    ...*.HÎ=....I.0F
00000060  02 21 00 80 34 2C E1 8D E5 87 EC 3F F6 6C 03 78    .!..4,á.å.ì?öl.x
00000070  91 FD 1F 08 B5 55 B5 BD EA E1 FF E4 4E 13 C1 32    .ý..µUµ½êáÿäN.Á2
00000080  0A F0 89 02 21 00 D6 08 34 EE 12 73 50 79 D0 22    .ð..!.Ö.4î.sPyÐ"
00000090  85 C6 EB A8 C5 E6 7C 63 24 C3 B8 83 81 5F 6B 15    .Æë¨Åæ|c$Ã¸.._k.
000000A0  50 62 AB A4 83 3E A0 82 01 1C 30 82 01 18 30 82    Pb«¤.> ...0...0.
000000B0  01 14 30 81 BC A0 03 02 01 02 02 01 00 30 0A 06    ..0.¼ .......0..
000000C0  08 2A 86 48 CE 3D 04 03 02 30 1C 31 0B 30 09 06    .*.HÎ=...0.1.0..
000000D0  03 55 04 03 0C 02 41 43 31 0D 30 0B 06 03 55 04    .U....AC1.0...U.
000000E0  0A 0C 04 73 6F 6D 65 30 1E 17 0D 32 31 30 39 32    ...some0...21092
000000F0  31 32 32 30 30 30 30 5A 17 0D 33 31 30 39 31 39    1220000Z..310919
00000100  32 32 30 30 30 30 5A 30 0D 31 0B 30 09 06 03 55    220000Z0.1.0...U
00000110  04 03 0C 02 63 61 30 59 30 13 06 07 2A 86 48 CE    ....ca0Y0...*.HÎ
00000120  3D 02 01 06 08 2A 86 48 CE 3D 03 01 07 03 42 00    =....*.HÎ=....B.
00000130  04 48 E6 28 8E 67 30 E7 59 C4 91 AE C1 36 CE 4B    .Hæ(.g0çYÄ.®Á6ÎK
00000140  AE 4C 2A 8F EB B1 90 9C CC 61 77 81 16 D1 D9 7C    ®L*.ë±..Ìaw..ÑÙ|
00000150  DB AA D7 52 8D 79 DF CE 76 8D B8 D1 B7 47 3D B8    Ûª×R.yßÎv.¸Ñ·G=¸
00000160  63 42 75 1C AA B3 75 9F 60 48 4F 88 30 61 BC CD    cBu.ª³u.\`HO.0a¼Í
00000170  C1 30 0A 06 08 2A 86 48 CE 3D 04 03 02 03 47 00    Á0...*.HÎ=....G.
00000180  30 44 02 20 4E 50 FB 3A FE EE 02 E1 75 2F 7F A3    0D. NPû:þî.áu/.£
00000190  5A 34 20 0E 06 D7 13 EA 0A 90 13 2B EC FC FA 51    Z4 ..×.ê...+ìüúQ
000001A0  27 DB 28 32 02 20 68 7E 08 FC 96 02 B1 93 67 E3    'Û(2. h~.ü..±.gã
000001B0  0A 90 8B 82 50 DF A5 2F 3C 37 B8 ED 69 9B C3 06    ....Pß¥/<7¸íi.Ã.
000001C0  B7 D3 7F 23 69 18                                  ·Ó.#i.`;

const b = new buffer.Blob([OCSPResponse]);
// fs.writeFileSync("tmpf.crt", OCSPResponse);

(async function() {
  const buff = await b.arrayBuffer();
  fs.writeFileSync('test-cert.crt', buffer.Buffer.from(buff));
})();
