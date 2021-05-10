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

    await newContact.save((err, docs) => {
        console.log(err);
        if(err) {
            res.send(err.errors);
        } else {
            res.send(docs);
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

exports.deleteContact = (req,res) => {
    const id = req.params.contactId;
    //contacts.findByIdAndDelete(req.params.id, (err,docs) => {
    contacts.findByIdAndDelete(id, (err,doc) => {
        if(err) {
            res.send({status:'failed', message: err});
        } else {
            console.log(doc);
            res.send({
                status:'success', 
                message: `${doc.fullName} is deleted from your contact list.`,
                data: doc._id
            });
        }
    })

    //res.send({status:'test', message: req.params.id});
}