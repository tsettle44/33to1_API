const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

const router = express.Router();

//GET Users
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray());
});

//POST User
router.post('/', async(req, res) => {
    const users = await loadUsersCollection();
    await users.insertOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        createdAt: new Date(),
    });
    res.status(201).send();
});

//DELETE User
router.delete('/:uID', async(req, res) => {
    const users = await loadUsersCollection();
    await users.deleteOne({_id: new mongodb.ObjectID(req.params.uID)});
    res.status(200).send();
});

//POST Auth User
router.post('/auth', async(req, res) => {
    const users = await loadUsersCollection();
    const user = await users.find({"email": req.body.email}).toArray();

    try {
        await user[0].email;
        if (await userAuth(await user[0].password, req.body.password)){
            res.status(200).send();
        } else {
            res.status(400).send();
            console.error('Password does not match')
        }
    } catch(err) {
        res.status(400).send();
        console.error('Email does not match');
    }
});

//User Auth
async function userAuth(hash, password){
    const auth = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash).then(function(res){
            resolve(res);
        });
    });

    return auth;
}

//Hash Password
async function hashPassword(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    
    return hashedPassword
}

//READ cred file
var fs = require('fs');
var cred;
fs.readFile('./server/routes/api/cred.json', 'utf8', function (err, data) {
  if (err) console.error(err);
  cred = JSON.parse(data);
});

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect
    (cred.cred,{
        useNewUrlParser: true
    });

    return client.db('api_33to1').collection('users');
}

module.exports = router;