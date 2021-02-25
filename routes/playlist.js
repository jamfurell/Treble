const express = require("express");
const db = require("../models");
const methodOverride = require("method-override");
const axios = require("axios");
const router = express.Router();

const app = express();

app.use(methodOverride("_method"));

// POST show user Homepage
router.get("/", function (req, res) {
  db.user
    .findOne({
      where: { id: req.user.id },
    })
    .then(function (user) {
      user.getPlaylists().then(function (playlist) {
        const userInfo = { playlist: playlist, user: user };
        res.render("playlist/homepage", { userInfo });
      });
    });
});

// POST create a new playlist
router.post("/", (req, res) => {
  db.user
    .findOne({
      where: { id: req.user.id },
      // <=====req.user.id is accessible through all pages?
    })
    .then(function (user) {
      db.playlist
        .findOrCreate({
          where: {
            name: req.body.name,
          },
        })
        .then(function ([playlist, created]) {
          user.addPlaylists([playlist]).then(function (relationInfo) {
            res.redirect("/playlist");
          });
        });
    });
});

// GET a specific playlist
router.get("/:id", (req, res) => {
  db.playlist
    .findOne({
      where: { id: req.params.id },
      include: [db.song],
    })
    .then((playlist) => {
      if (!playlist) throw Error();
      res.render("playlist/show", { playlist });
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

// GET songs from the API to display on the playlist show page
router.get("/:id/search", function (req, res) {
  db.playlist
    .findOne({
      where: { id: req.params.id },
      include: [db.song],
    })
    .then(function (playlist) {
      let track = req.query.songTitle;
      let songs = [];
      axios
        .get(`https://api.deezer.com/search?q=${track}`)
        .then(function (apiResponse) {
          songs = apiResponse.data.data;
        })
        .then(function () {
          res.render("playlist/search", { songs, playlist });
        });
    });
});

// POST associate a song with a playlist
router.post("/:id/search", (req, res) => {
  db.playlist
    .findOne({
      where: { id: req.params.id },
    })
    .then(function (playlist) {
      db.song
        .findOrCreate({
          where: {
            name: req.body.title,
            artist: req.body.artist,
            // lastFmId: req.body.songUrl,
            album: req.body.album,
          },
        })
        .then(function ([song, created]) {
          playlist.addSongs([song]).then(function (relationInfo) {
            // res.redirect(`/playlist/${req.params.id}`)
            res.redirect("back");
          });
        });
    });
});

//GET route for editing playlist name
router.get("/:id/edit", function (req, res) {
  db.playlist
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then(function (playlist) {
      res.render("playlist/edit", { playlist });
    });
});

//Put route to update playlist name
router.put("/:id", function (req, res) {
  db.playlist
    .update(
      {
        name: req.body.playlistName,
      },
      {
        where: { id: req.body.playlist },
      }
    )
    .then(function (playlist) {
      res.redirect("/playlist");
    });
});

// DELETE playlist
router.delete("/:id/song", function (req, res) {
  db.playlistsSongs
    .destroy({
      where: {
        playlistId: req.params.id,
        songId: req.body.songId,
      },
    })
    .then(function () {
      res.redirect("back");
    });
});

module.exports = router;
