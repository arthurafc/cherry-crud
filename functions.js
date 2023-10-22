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
  return await executeQuery("SELECT * FROM teams");
}

module.exports = {
  executeQuery,
  getTeams
};
