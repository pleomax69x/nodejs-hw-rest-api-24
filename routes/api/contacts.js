const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../model/index");
const {
  validateContact,
  validateContactUpdate,
  validateContactUpdateFavorite,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({ status: "succes", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res
      .status(201)
      .json({ status: "succes", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: "succes",
        code: 200,
        message: "contact deleted",
        data: { contact },
      });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", validateContactUpdate, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  validateContactUpdateFavorite,
  async (req, res, next) => {
    try {
      const contact = await updateStatusContact(req.params.contactId, req.body);
      if (contact) {
        return res
          .status(200)
          .json({ status: "succes", code: 200, data: { contact } });
      }
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
