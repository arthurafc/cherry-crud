const conn = require("./db");

const teams = 0;

const members = 0;

function teamMembers(id) {
  let team = [];
  members.forEach((membersItr) => {
    if (membersItr.team_id == id) {
      team.push(membersItr.name);
    }
  });

  return team;
}

module.exports = { teams, teamMembers };
