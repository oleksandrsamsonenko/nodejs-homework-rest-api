const fs = require("fs/promises");
const path = require(`path`);
const { nanoid } = require(`nanoid`);

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateContacts(data);
  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const data = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  const newList = [...data, newContact];
  await updateContacts(newList);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { id: contactId, name, email, phone };
  await updateContacts(data);
  return data[index];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
