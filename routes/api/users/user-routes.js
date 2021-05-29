const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/user-control");
const guard = require("../../../helpers/guard");
const { validateUser } = require("./validation");

router.post("/signup", validateUser, ctrl.reg);
router.post("/login", validateUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.getByToken);
router.patch("/", guard, ctrl.updateUser);

module.exports = router;
