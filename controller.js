const AppError = require("./appError.js");
const conn = require("./db/db.js");

exports.getAllTeams = (req, res, next) => {
  conn.query("SELECT * FROM teams", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data ? data.length : undefined,
      data: data,
    });
  });
};

exports.createTeam = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [req.body.name, "pending"];
  conn.query(
    "INSERT INTO teams (name) VALUES(?)",
    [values],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "team created!",
      });
    }
  );
};

exports.getTeam = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  conn.query(
    "SELECT * FROM teams WHERE id = ?",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data ? data.length : undefined,
        data: data,
      });
    }
  );
};

exports.updateTeam = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  conn.query(
    "UPDATE teams SET name='updated team' WHERE id=?",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "team updated!",
      });
    }
  );
};

exports.deleteTeam = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  conn.query(
    "DELETE FROM teams WHERE id=?",
    [req.params.id],
    function (err, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "team deleted!",
      });
    }
  );
 }