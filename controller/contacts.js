const contacts = require('../model/contacts');
const logs = require('../model/logs');

exports.newContact = async (req, res) => {
    console.log('controller', req.body);
    console.log(req.logId);
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
            console.log(docs)
            res.send(docs);
            //const updatedLog = new logs({postData: docs});
            logs.findByIdAndUpdate(req.logId, {postData: JSON.stringify(docs)}, (err,doc) => console.log({err,doc}));
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
    //contacts.deleteOne(req.params.id, (err,docs) => {    
    contacts.findByIdAndDelete(id, (err,doc) => {
        if(err) {
            console.log(err);
            res.send({status:'failed', message: err});
        } else if (doc === null) {
            res.send({status:'failed', message: 'There was no contact'});
        } else {
            console.log(doc);
            logs.findByIdAndUpdate(req.logId, {preData: JSON.stringify(doc)}, (err,doc) => {});
            res.send({
                status:'success', 
                message: `${doc.fullName} is deleted from your contact list.`,
                data: doc._id
            });
        }
    })
    
    //res.send({status:'test', message: req.params.id});
}

exports.updateContact = async (req,res) => {
    console.log(req.body);
    const contact = {...req.body}

    contacts.findByIdAndUpdate(contact._id, contact, {upsert: true, runValidators: true}, (err,doc)=>{
        if (err) {
            console.log(err);
            res.send({status:'failed', message: err});
        } else {
            console.log(doc);
            logs.findByIdAndUpdate(req.logId, {preData: JSON.stringify(doc), postData: JSON.stringify(contact)}, (err) => {});
            res.send(({status:'success', message: 'Contact updated successfully'}));
        }
    });
/* 
    const updatedContact = await contacts.findById(contact._id);
    
    //new contacts(contact);

    Object.keys(contact).forEach(key => updatedContact[key] = contact[key]);

    //updatedContact.fullName = contact.fullName;
    // updatedContact.email = contact.email;
    // updatedContact.phone = contact.phone;
    // updatedContact.address = contact.address;

    updatedContact.save((err,doc)=>{
        if (err) {
            console.log(err);
            res.send({status:'failed', message: err});
        } else {
            console.log(doc);
            res.send(({status:'success', message: 'Contact updated successfully'}));
        }
    }); */
}