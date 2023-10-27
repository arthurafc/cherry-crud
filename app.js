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
  const teamID = request.params.teamID;
  const memIndex = request.params.memIndex;
  try {
    const members = await functions.getMembers(teamID);
    response.send(members[memIndex - 1]);
  } catch (error) {
    response.send("Error getting team member.");
  }
});

app.post("/new-teams", async function (request, response) {
  const newTeamsJSON = request.body;
  const newTeamsNames = newTeamsJSON.map((teamsInfo) => teamsInfo.name);
  const requestsUpdates = [];
  for (let index = 0; index < newTeamsNames.length; index++) {
    if ((await functions.getTeamByName(newTeamsNames[index])) != 0) {
      requestsUpdates.push(
        `${newTeamsNames[index]} has already been inserted.`
      );
    }
    try {
      functions.postTeam(newTeamsNames[index]);
      requestsUpdates.push(`${newTeamsNames[index]} posted.`);
    } catch (error) {
      requestsUpdates.push(`Error posting ${newTeamsNames[index]}.`);
    }
  }
  response.send(requestsUpdates);
});

app.post("/new-members", async function (request, response) {
  const newMembersJSON = request.body;
  const newMembersNames = newMembersJSON.map((membersInfo) => membersInfo.name);
  const newMembersTeamsIDs = newMembersJSON.map(
    (membersInfo) => membersInfo.team_id
  );
  const requestsUpdates = [];
  for (let index = 0; index < newMembersNames.length; index++) {
    try {
      if ((await functions.getTeamByID(newMembersTeamsIDs[index])) == 0) {
        requestsUpdates.push(`Team ID ${newMembersTeamsIDs[index]} not found.`);
      }
      if (
        (await functions.getMemberByNameAndID(
          newMembersTeamsIDs[index],
          newMembersNames[index]
        )) != 0
      ) {
        requestsUpdates.push(
          `${newMembersNames[index]} has already been inserted to Team ID ${newMembersTeamsIDs[index]}.`
        );
      }
    } catch (error) {
      requestsUpdates.push(`Bad data from ${index} resquest.`);
    }
    try {
      functions.postMembers(newMembersTeamsIDs[index], newMembersNames[index]);
      requestsUpdates.push(`${newMembersNames[index]} posted.`);
    } catch (error) {
      requestsUpdates.push("Error posting members.");
    }
  }
  response.send(requestsUpdates);
});
