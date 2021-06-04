const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contact-control");
const guard = require("../../../helpers/guard");
const {
  validateContact,
  validateContactUpdate,
  validateContactUpdateFavorite,
} = require("./validation");

router.get("/", guard, ctrl.getAll);

router.get("/:contactId", guard, ctrl.getById);

router.post("/", guard, validateContact, ctrl.create);

router.delete("/:contactId", guard, ctrl.remove);

router.put("/:contactId", guard, validateContactUpdate, ctrl.update);

router.patch(
  "/:contactId/favorite",
  guard,
  validateContactUpdateFavorite,
  ctrl.update
);

router.get("/contacts?page=1&limit=20", guard, ctrl.getAll);
router.get("/contacts?favorite=true", guard, ctrl.getAll);

module.exports = router;
