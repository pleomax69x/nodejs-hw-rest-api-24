const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/user-control");
const guard = require("../../../helpers/guard");
const { validateUser } = require("./validation");
const upload = require("../../../helpers/upload");

router.get("/verify/:token", ctrl.verify);
router.post("/verify", ctrl.repeatSendEmailverify);
router.post("/signup", validateUser, ctrl.reg);
router.post("/login", validateUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.getByToken);
router.patch("/", guard, ctrl.updateUser);
router.patch("/avatars", [guard, upload.single("avatar")], ctrl.avatars);

module.exports = router;
