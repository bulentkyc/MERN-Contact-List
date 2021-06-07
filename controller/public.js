const contacts = require('../model/contacts');
const nodemailer = require("nodemailer");

exports.about = (req, res) => {
    contacts.find({},(err, docs)=>{
        if (err) {
            res.render('about', {testData:`There's a problem. Please try again.`});
        } else {
            res.render('about', {testData: docs});
        }
    });
}

exports.getContact = async (req, res) => {
    console.log(req.body);
    res.json({status: 'success', message: 'Congratulations!'});

    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // no need to set host or port etc.
        auth: {
            user: 'bulentkyc@gmail.com',
            pass: process.env.GMAIL
        }
    });

    /* console.log({
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    }); */

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Customer Support" <visitor@mywebsite.com>', // sender address
        to: "bulent.kayici@icloud.com, nikolas.dimitriadis@hotmail.com", // list of receivers
        subject: "Ticket from: "+req.body.fullName, // Subject line
        text: req.body.message, // plain text body
        html: `<b>${req.body.message}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}