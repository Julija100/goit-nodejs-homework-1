const path = require("path");
const { readFile, writeFile } = require("fs/promises");
const chalk = require("chalk");
const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function listContacts() {
  const fileContent = await readFile(contactsPath, "utf8");
  return JSON.parse(fileContent);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => {
    return contact.id.toString() === contactId;
  });
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => {
    return contact.id.toString() !== contactId;
  });
  await writeFile(contactsPath, JSON.stringify(newContacts));
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    const newContactsList = [...contacts, newContact];

    const dublicateContacts = contacts.find(
      (contact) =>
        name.toLowerCase() === contact.name.toLowerCase() &&
        email.toLowerCase() === contact.email.toLowerCase() &&
        phone === contact.phone
    );
    if (dublicateContacts) {
      throw new Error ("This contact already exists!");
    }
    await writeFile(contactsPath, JSON.stringify(newContactsList));

    console.log(chalk.green(`${name} added to contact list!`));

    return newContact;
  } catch (error) {
    console.error(chalk.red(error.message));
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
