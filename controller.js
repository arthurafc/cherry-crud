const AppError = require("./appError.js");
const conn = require("./db/db.js");

exports.getAllTeams = (req, res, next) => {
  conn.query("SELECT * FROM teams", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      data: data,
    });
  });
};

exports.getTeam = (req, res, next) => {
  conn.query(
    "SELECT * FROM teams WHERE id = ?",
    [req.params.teamId],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        data: data,
      });
    }
  );
};

exports.getAllMembersInTeam = (req, res, next) => {
  conn.query(
    "SELECT * FROM members WHERE group_id = ?",
    [req.params.teamId],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        data: data,
      });
    }
  );
};

exports.getMemberInTeam = (req, res, next) => {
  conn.query(
    "SELECT * FROM members WHERE group_id = ? AND id = ?",
    [req.params.teamId, req.params.memberId],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        data: data,
      });
    }
  );
};
