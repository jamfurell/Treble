const express = require("express");
const db = require("../models");
const axios = require("axios");
const methodOverride = require("method-override");
const router = express.Router();

const app = express();

app.use(methodOverride("_method"));

// POST associate a favorite song with a user
router.post("/add", (req, res) => {
  db.usersSongs
    .findOrCreate({
      where: {
        userId: req.user.id,
        songId: req.body.songId,
      },
    })
    .then((usersSongs) => {
      console.log(!usersSongs);
      res.redirect("back", { usersSongs });
    });
});

module.exports = router;
