const contacts = require('../model/contacts');

exports.about = (req, res) => {
    contacts.find({},(err, docs)=>{
        if (err) {
            res.render('about', {testData:`There's a problem. Please try again.`});
        } else {
            res.render('about', {testData: docs});
        }
    });
}