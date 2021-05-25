const users = require('../model/users');

exports.registerPost = (req, res) => {
/* 
    const email = req.body.email;
    const pass = req.body.pass;

    const {email, pass} = req.body;

    const newUser = new users({email, pass});
 */
    
    const newUser = new users(req.body);

    users.findOne({email:req.body.email}, (err, doc) => {
        if (err) {
            console.log(err);
            res.send({status:'failed', message: err});
        } else if(doc !== null) {
            res.status(406).send(({status:'failed', message: 'Please try different email!'}));
        } else {
            newUser.save((err, doc)=>{
                if (err) {
                    console.log(err);
                    res.send({status:'failed', message: err});
                } else {
                    console.log(doc);
                    res.send(({status:'success', message: 'The account is created successfully'}));
                }
            });
        }
    });

}


exports.loginPost = (req,res) => {
    users.findOne(req.body, (err, doc) => {
        if (err) {
            console.log(err);
            res.send({status:'failed', message: err});
        } else if(doc == null) {
            res.status(406).send(({status:'failed', message: 'Wrong credentials!'}));
        } else {
            //console.log(doc);
            if (doc.pass == req.body.pass) {
                res.send(({status:'success', message: 'User logged in successfully'}));
            } else {
                res.send({status:'failed', message: `There's an error, please try again later.`});
            }
        }
    })
}