const path = require("path");
const { readFile, writeFile } = require("fs/promises");
const { write } = require("fs");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const fileContent = await readFile(contactsPath, "utf8");
  return JSON.parse(fileContent);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => {
    return contact.id === contactId;
  });
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => {
    return contact.id !== contactId;
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
        if (dublicateContacts)
            return console.log(chalk.green('This contact already exists!'));
        
        await writeFile(contactsPath, JSON.stringify(newContactsList));

        console.log(chalk.blue(`${name} added to contact list!`));
        return newContact;
    } catch (error) {
        return console.error(chalk.red(error.message));
    }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
