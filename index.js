const { Command } = require("commander");
const chalk = require("chalk");
const contacts = require("./contacts.js");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {

  switch (action) {
    case "list":
      {
        const output = await contacts.listContacts();
        console.table(output);
      }
      break;

    case "get":
      {
        const output = await contacts.getContactById(id);
        console.log(output);
      }
      break;

    case "add":
      {
        const output = await contacts.addContact(name, email, phone);
        console.log(output);
      }

      break;

    case "remove":
      {
        const output = await contacts.removeContact(id);
        console.log(output);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
