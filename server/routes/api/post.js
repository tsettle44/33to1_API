const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET Post
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

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://tbsett:FyK8DD9Lr8Bwcrc@ds017248.mlab.com:17248/api_33to1',{
        useNewUrlParser: true
    });

    return client.db('api_33to1').collection('posts');
}

module.exports = router;