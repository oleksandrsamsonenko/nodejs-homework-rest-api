const express = require("express");
const router = express.Router();

const HttpError = require("../../helpers/HttpError");
const contactsService = require(`../../models/contacts`);
const {
  putValidationSchema,
  postValidationSchema,
} = require("../../schemas/contacts-shemas");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getById(id);
    if (!result) {
      throw HttpError(404, `Not Found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = postValidationSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Not Found`);
    }
    res.json({ message: "Contact Deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (JSON.stringify(req.body) === "{}") {
      throw HttpError(400, "Missing Fields");
    }
    const { error } = putValidationSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Not Found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
