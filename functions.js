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
  return await executeQuery(`SELECT * FROM teams`, []);
}

const getMembers = async (teamID) => {
  return await executeQuery(`SELECT * FROM members WHERE group_id = ${teamID}`);
}

const postTeam = async (newTeam) => {
  return await executeQuery(`INSERT INTO teams (name) VALUES ('${newTeam}')`);
}

module.exports = {
  executeQuery,
  getTeams,
  getMembers,
  postTeam
};
