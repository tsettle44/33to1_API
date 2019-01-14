const express = require("express");
const mongodb = require("mongodb");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
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

      posts.sort((a, b) =>
        a.createdAt > b.createdAt
          ? b.createdAt - a.createdAt
          : b.createdAt > a.createdAt
          ? b.createdAt - a.createdAt
          : 0
      );

      console.log(posts);

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
router.delete("/:pID", (req, res) => {
  Post.deleteOne({ _id: req.params.pID }, err => {
    err ? console.log(err) : res.status(202).send();
  });
});

//GET Specific Post
router.get("/:pID", (req, res) => {
  Post.findOne({ _id: req.params.pID }, (err, post) => {
    err ? console.log(err) : res.send(post);
  });
});

//POST Like Post
router.post("/:pID/like", (req, res) => {
  Post.findOne({ _id: req.params.pID }, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      newPost = post.toObject();
      newPost.likes = parseInt(newPost.likes) + 1;
      Post.updateOne({ _id: req.params.pID }, newPost, (err, p) => {
        console.log(p, newPost);
        err ? console.log(err) : res.status(204).send();
      });
    }
  });
});

//POST Comment to Post
router.post("/:pID/comment", async (req, res) => {
  if (req.body.name && req.body.body) {
    const commentData = {
      name: req.body.name,
      body: req.body.body
    };

    //insert comment
    Comment.create(commentData, (err, comment) => {
      if (err) {
        console.log(err);
      } else {
        console.log(comment);
        Post.findOne({ _id: req.params.pID }, (err, post) => {
          if (err) {
            console.log(err);
          } else {
            Comment.findOne()
              .sort({ createdAt: -1 })
              .exec((err, c) => {
                newPost = post.toObject();
                newPost.comments.push(c);
                Post.updateOne({ _id: req.params.pID }, newPost, err => {
                  err ? console.log(err) : res.status(201).send();
                });
              });
          }
        });
      }
    });
  } else {
    console.log("Request all fields");
  }
});

module.exports = router;
