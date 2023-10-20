const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const router = require("./router.js");
const AppError = require("./appError.js");
const errorHandler = require("./errorHandler.js");
const config = require('./config.js');
const PORT = config.PORT;

app.use(router);

app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exist`, 404));
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
