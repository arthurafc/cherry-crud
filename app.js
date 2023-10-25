const express = require("express");
const app = express();
app.use(express.json());
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
  } catch (error) {
    response.send("Error getting teams.");
  }
});

app.get("/teams/:id", async function (request, response) {
  teamID = request.params.id;
  try {
    const members = await functions.getMembers(teamID);
    response.send(members);
  } catch (error) {
    response.send("Error getting team members.");
  }
});

app.get("/teams/:teamID/:memIndex", async function (request, response) {
  teamID = request.params.teamID;
  memIndex = request.params.memIndex;
  try {
    const members = await functions.getMembers(teamID);
    response.send(members[memIndex - 1]);
  } catch (error) {
    response.send("Error getting team member.");
  }
});

app.post("/new-teams", async function (request, response) {
  const newTeam = request.body;
  if ((await functions.getTeamByName(newTeam.name)) != 0) {
    return response.send(`${newTeam.name} has already been inserted.`);
  }
  try {
    functions.postTeam(newTeam.name);
    response.send(newTeam);
  } catch (error) {
    response.send("Error posting team.");
  }
});

app.post("/new-members", async function (request, response) {
  const newMembersJSON = request.body;
  const newMembersNames = newMembersJSON.map((item) => item.name);
  const newMembersTeamsIDs = newMembersJSON.map((item) => item.team_id);
  const results = [];
  for (let index = 0; index < newMembersNames.length; index++) {
    try {
      if ((await functions.getTeamByID(newMembersTeamsIDs[index])) == 0) {
        results.push(`Team ID ${newMembersTeamsIDs[index]} not found.`);
      }
      if (
        (await functions.getMemberByNameAndID(
          newMembersTeamsIDs[index],
          newMembersNames[index]
        )) != 0
      ) {
        results.push(
          `${newMembersNames[index]} has already been inserted to Team ID ${newMembersTeamsIDs[index]}.`
        );
      }
    } catch (error) {
      results.push("Bad data.");
    }
    try {
      functions.postMembers(newMembersTeamsIDs[index], newMembersNames[index]);
    } catch (error) {
      results.push("Error posting members.");
    }
  }
  response.json(results);
});
