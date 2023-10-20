const express = require("express");
const controllers = require("./controller.js");
const router = express.Router();

router.route("/").get(controllers.getAllTeams);
router.route("/:teamId").get(controllers.getTeam);

const membersRouter = express.Router({ mergeParams: true });

membersRouter.route("/").get(controllers.getAllMembersInTeam);
membersRouter.route("/:memberId").get(controllers.getMemberInTeam);

router.use("/:teamId/members", membersRouter);

module.exports = router;
