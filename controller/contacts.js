const contacts = require('../model/contacts');

exports.newContact = async (req, res) => {
    console.log(req.body);
    /* 
        const {fullName, email, phone, address} = req.body;
        const newContact = new contacts({
            fullName, email, phone, address
        });
    */

    const newContact = new contacts(req.body);

    await newContact.save(err => {
        console.log(err);
        if(err) {
            res.send(err.errors);
        } else {
            res.send(`${req.body.fullName} is registered on your contact list`);
        }
    });

   /*  newContact.save().then((result,err) => {
        if (err) {
            res.send({status:'failed', message: err});
        }else {
            res.send(`${req.body.fullName} is registered on your contact list`);
        }
    }); */

    //res.send('success!');
}

exports.getAll = (req,res) => {
    contacts.find({}, (err , docs) => {
        if (err) {
            res.send(err);
        } else {
            res.send(docs);
        }
    });
}