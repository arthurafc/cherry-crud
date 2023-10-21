const express = require("express");
const app = express();
app.use(express.json());
const conn = require("./db");
const config = require("./config");
const PORT = config.PORT;

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

app.get("/teams", (request, response) => {
  conn.query("SELECT * FROM teams", function (error, teams) {
    if (error) response.send("error");;
    response.send(teams);
  });
});

app.get("/teams/:id", (request, response) => {
  teamID = request.params.id;
  conn.query("SELECT * FROM members WHERE group_id = ?", teamID, function (error, members) {
    if (error) response.send("error");
    response.send(members);
  });
});

app.get("/teams/:teamID/:memID", (request, response) => {
  teamID = request.params.teamID;
  memID = request.params.memID;
  conn.query("SELECT * FROM members WHERE group_id = ? AND id = ?", [teamID, memID], function (error, members) {
    if (error) response.send("error");
    response.send(members);
  });
});