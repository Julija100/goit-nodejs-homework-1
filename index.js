const { removeContact } = require("./contacts");


removeContact(1).then((contact) => {
    console.log(contact);
});
