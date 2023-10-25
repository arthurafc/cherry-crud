const conn = require("./db");

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    conn.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const getTeams = async () => {
  return await executeQuery(`SELECT * FROM teams`);
}

const getMembers = async (teamID) => {
  return await executeQuery(`SELECT * FROM members WHERE group_id = ${teamID}`);
}

const postTeam = async (newTeam) => {
  return await executeQuery(`INSERT INTO teams (name) VALUES ('${newTeam}')`);
}

const postMembers = async (teamID, memberName) => {
  return await executeQuery(`INSERT INTO members (group_id, name) VALUES (${teamID}, '${memberName}')`);
}

const getTeamByName = async (teamName) => {
  return await executeQuery(`SELECT * FROM teams WHERE name LIKE '%${teamName}%'`);
}

const getTeamByID = async (teamID) => {
  return await executeQuery(`SELECT * FROM teams WHERE id = ${teamID}`);
}

const getMemberByNameAndID = async (teamID, memberName) => {
  return await executeQuery(`SELECT * FROM members WHERE group_id = ${teamID} AND name = '${memberName}'`);
}

module.exports = {
  executeQuery,
  getTeams,
  getMembers,
  postTeam,
  postMembers,
  getTeamByName,
  getTeamByID,
  getMemberByNameAndID
};
