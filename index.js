const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mgoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

/*app.get('/home', function(req, res) {
    return res.render('home', {
        title: 'Welcome to home'

    });
});
*/

app.get('/', function(req, res) { //app.get means get type req
    // console.log(__dirname);
    //res.send('<h1> Cool, it is running or is it ?</h1>');

    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log('Error in fetching contact!');
            return;
        }

        return res.render('home', {
            title: "contact List ",
            contact_list: contacts
        });
    });



});


app.get('/create-contact', function(req, res) { //app.get means get type req
    // console.log(__dirname);
    //res.send('<h1> Cool, it is running or is it ?</h1>');
    return res.render('home', {
        title: 'My Contact list',
        contact_list: contactList
    });
});

app.use(express.urlencoded());

//middleware1
/*
app.use(function(req, res, next) {
    console.log('middleware1 called')
    next();
});
*/
var contactList = [{

        name: "Adnan",
        phone: "7872678"
    },
    {
        name: "Rehan",
        phone: "+966 430 79635"
    }, {
        name: "Uma",
        phone: "76776389"
    }
]



//creating another controller for practice.ejs
app.get('/practice', function(req, res) {
    return res.render('practice', {
        title: "Play with fun & rides this adventures",
        p: "Have a good day dost"




    });

});

app.post('/c-contact', function(req, res) {
    // console.log(req);
    // console.log(req.body.my_name);
    // contactList.push({
    //  name: req.body.my_name,
    //  phone: req.body.phone

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if (err) {
            console.log('error in creating contact!', err);
            //return
            return;
            //res.redirect('back');
        }
        console.log('******', newContact);
        return res.redirect('back');

    });


    //return res.redirect('/create-contact');
});

//for deletig a contact
app.get('/delete-contact', function(req, res) {

    //get the id from query in the ul

    let id = req.query.id;
    //find the contadct in the datavase using id and delete

    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log('error in deleting and object from database');
            return;
        }
    });



    //get the query from the url
    /* let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if (contactIndex != -1) {
        contactList.splice(contactIndex, 1);
    }
    return res.redirect('back');

    */
});



app.listen(port, function(err) {
    if (err) {
        console.log('Eror in running the server');

    }
    console.log('Yup My express server is running on port:', port);

});