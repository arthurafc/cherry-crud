const fs = require('fs');
const rawData = fs.readFileSync('./db/groups.json');
const groups = JSON.parse(rawData);

const rawData2 = fs.readFileSync('./db/members.json');
const members = JSON.parse(rawData2);

function groupMembers(id) {
    let group = [];
    members.forEach(membersItr => {
        if (membersItr.group_id == id) {
            group.push(membersItr.name);
        }
    });

    return group;
}

module.exports = { groups, groupMembers };