const fs = require('fs');
const rawData = fs.readFileSync('./db/groups.json');
const groups = JSON.parse(rawData);

const rawData2 = fs.readFileSync('./db/members.json');
const members = JSON.parse(rawData);

//module.exports = { functionName1, funtionName2, functionNameN };