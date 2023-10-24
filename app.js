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

app.get("/teams", async function (request, response) {
  try {
    const teams = await functions.getTeams();
    response.send(teams);
  } catch(error) {
    response.send([]);
  }
});

app.get("/teams/:id", async function (request, response) {
  teamID = request.params.id;
  try {
    const members = await functions.getMembers(teamID);
    response.send(members);
  } catch (error) {
    response.send([]);
  }
});

app.get("/teams/:teamID/:memIndex", async function (request, response) {
  teamID = request.params.teamID;
  memIndex = request.params.memIndex;
  try {
    const members = await functions.getMembers(teamID);
    response.send(members[memIndex-1]);
  } catch (error) {
    response.send([]);
  }
});

app.post("/newTeam", async function (request, response) {
  const newTeam = request.body;
  try {
    functions.postTeam(newTeam.name);
    response.send(newTeam);
  } catch (error) {
    response.send([]);
  }
});