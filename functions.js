const fs = require('fs');
const rawData = fs.readFileSync('./db/groups.json');
const groups = JSON.parse(rawData);

const rawData2 = fs.readFileSync('./db/members.json');
const members = JSON.parse(rawData2);

function groupMembers(id) {
    let arr = [];
    members.forEach(membersItr => {
        if (membersItr.group_id == id) {
            arr.push(membersItr.name);
        }
    });

    return arr;
}

module.exports = { groups, groupMembers };