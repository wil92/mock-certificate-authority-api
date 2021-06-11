const fs = require('fs');
const util = require("util");

const unlink = util.promisify(fs.unlink);

module.exports = async function (crsCertName) {
    await unlink(crsCertName);
}
