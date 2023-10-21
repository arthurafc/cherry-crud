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

app.get("/teams", (request, response) => {
  response.send("teste");
});

app.get("/teams/:id", (request, response) => {
  const id = request.params.id;
  const teamMembers = functions.teamMembers(id);

  response.send(teamMembers);
});
