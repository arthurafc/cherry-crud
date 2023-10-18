const express = require('express');
const app = express();
app.use(express.json());

const config = require('./config.js');
const PORT = config.PORT;

const functions = require("./functions");

app.get("/status", (request, response) => {
  const status = {
    "Status": "Running"
  };
  response.send(status);
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("", (request, response) => {
  response.send("cherry-crud");
});

app.get('/groups', (request, response) => {
  const groups = functions.groups;
  
  response.send(groups);
});

app.get('/groups/:id', (request, response) => {
  const id = request.params.id;
  const groupMembers = functions.groupMembers(id);
  
  response.send(groupMembers);
});