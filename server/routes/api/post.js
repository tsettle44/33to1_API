const express = require("express");
const mongodb = require("mongodb");
const Post = require("../../models/Post");
const router = express.Router();

//GET Posts
router.get("/", async (req, res) => {
  Post.find({}, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      const posts = [];

      post.forEach(p => {
        posts.unshift(p);
      });

      res.send(posts);
    }
  });
});

//POST Post
router.post("/", (req, res) => {
  if (req.body.name && req.body.body) {
    const postData = {
      name: req.body.name,
      body: req.body.body
    };

    //insert
    Post.create(postData, (err, post) => {
      if (err) {
        console.log(err);
      } else {
        console.log(post);
        res.status(201).send();
      }
    });
  } else {
    console.log("Request all fields");
  }
});

//DELETE Post
router.delete("/:pID", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.pID) });
  res.status(200).send();
});

//GET Specific Post
router.get("/:pID", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(
    await posts.find({ _id: new mongodb.ObjectID(req.params.pID) }).toArray()
  );
});

//POST Like Post
router.post("/:pID/like", async (req, res) => {
  const posts = await loadPostsCollection();
  const post = await posts
    .find({ _id: new mongodb.ObjectID(req.params.pID) })
    .toArray();
  let likes = (await post[0].likes) + 1;
  try {
    posts.updateOne(
      { _id: new mongodb.ObjectID(req.params.pID) },
      { $set: { likes: await likes } }
    );
    res.status(201).send();
  } catch (err) {
    res.send(err);
  }
});

//POST Comment to Post
router.post("/:pID/comment", async (req, res) => {
  const posts = await loadPostsCollection();
  const comment = {
    postedBy: req.body.postedBy,
    name: req.body.name,
    body: req.body.body,
    createdAt: new Date()
  };
  try {
    posts.updateOne(
      { _id: new mongodb.ObjectID(req.params.pID) },
      { $push: { comments: comment } }
    );
    res.status(201).send();
  } catch (err) {
    res.send(err);
  }
});

//READ cred file
var fs = require("fs");
var cred;
fs.readFile("./server/routes/api/cred.json", "utf8", function(err, data) {
  if (err) console.error(err);
  cred = JSON.parse(data);
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    cred.cred,
    {
      useNewUrlParser: true
    }
  );

  return client.db("api_33to1").collection("posts");
}

module.exports = router;
