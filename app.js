const express = require("express");
const app = express();
app.use(express.json());
const conn = require("./db");
const config = require("./config");
const PORT = config.PORT;
const { getTeams } = require('./functions');

const functions = require("./functions");

app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };
  response.send(status);
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("", (request, response) => {
  response.send("cherry-crud");
});

app.get("/teams", async function (request, response) {
  try {
    const teams = await getTeams();
    response.send(teams);
  } catch(error) {
    response.send([]);
  }
});

app.get("/teams/:id", (request, response) => {
  teamID = request.params.id;
  conn.query("SELECT * FROM members WHERE group_id = ?", teamID, function (error, members) {
    if (error) response.send("error");
    response.send(members);
  });
});

app.get("/teams/:teamID/:memIndex", (request, response) => {
  teamID = request.params.teamID;
  memIndex = request.params.memIndex;
  conn.query("SELECT * FROM members WHERE group_id = ? ORDER BY id", teamID, function (error, members) {
    if (error) response.send("error");
    response.send(members[memIndex-1]);
  });
});