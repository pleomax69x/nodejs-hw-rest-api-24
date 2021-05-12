const fs = require("fs/promises");
const contacts = require("./contacts.json");
const { join } = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contactsFilter = allContacts.filter(
      (contact) => contact.id !== contactId
    );

    if (allContacts.length === contactsFilter.length) return false;
    await fs.writeFile(contactsPath, JSON.stringify(contactsFilter, null, 2));
    return true;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  const id = uuidv4();
  const record = {
    id,
    ...body,
  };
  try {
    const allContacts = await listContacts();
    allContacts.push(record);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return record;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find((contact) => contact.id === contactId);

    if (!contact) return false;
    Object.assign(contact, body);
    Object.assign(allContacts, contact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return contact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
