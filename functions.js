const conn = require("./db.js");

const groups = 0;

const members = 0;

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