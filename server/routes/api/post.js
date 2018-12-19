const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
const cred = require('./cred');

//GET Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//POST Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        postedBy: req.body.postedBy,
        name: req.body.name,
        body: req.body.body,
        createdAt: new Date(),
        likes: 0,
        comments: []
    });
    res.status(201).send();
});

//DELETE Post
router.delete('/:pID', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.pID)});
    res.status(200).send();
});

//GET Specific Post
router.get('/:pID', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({"_id": new mongodb.ObjectID(req.params.pID)}).toArray());
});

//POST Like Post
router.post('/:pID/like', async (req, res) => {
    const posts = await loadPostsCollection();
    const post = await posts.find({"_id": new mongodb.ObjectID(req.params.pID)}).toArray();
    let likes = await post[0].likes + 1;
    try{
        posts.updateOne(
            { "_id" : new mongodb.ObjectID(req.params.pID) },
            { $set: { "likes" : await likes }}
        )
        res.status(201).send();
    } catch(err) {
        res.send(err);
    }
});

//POST Comment to Post
router.post('/:pID/comment', async (req, res) => {
    const posts = await loadPostsCollection();
    const post = await posts.find({"_id": new mongodb.ObjectID(req.params.pID)}).toArray();
    await post[0].comments.append({
        postedBy: req.body.postedBy,
        name: req.body.name,
        body: req.body.body,
        createdAt: new Date(),
        likes: 0,
        comments: []
    });
    res.status(201).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    (cred,{
        useNewUrlParser: true
    });

    return client.db('api_33to1').collection('posts');
}

module.exports = router;