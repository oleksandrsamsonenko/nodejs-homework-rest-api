const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controllers");
const {
  postValidateBody,
  putValidateBody,
} = require("../../utils/contacts-validation");

router.get("/", contactsController.listContacts);

router.get("/:id", contactsController.getById);

router.post("/", postValidateBody(), contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.put("/:contactId", putValidateBody(), contactsController.updateContact);

module.exports = router;
