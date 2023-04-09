const express = require("express");
const router = express.Router();
const Joi = require("joi");

const HttpError = require("../../helpers/HttpError");
const contactsService = require(`../../models/contacts`);

const validationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `missing required name field` }),
  email: Joi.string()
    .required()
    .messages({ "any.required": `missing required email field` }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": `missing required phone field` }),
});

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
    const { error } = validationSchema.validate(req.body);
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
    const { error } = validationSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing Fields");
    }
    const { contactId } = req.params;
    console.log(contactId);
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
