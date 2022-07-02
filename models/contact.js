const mg = require('mongoose');
const contactSchema = new mg.Schema({
    name: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true
    }
});
const Contact = mg.model('Contact', contactSchema);

module.exports = Contact;