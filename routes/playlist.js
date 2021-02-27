const express = require("express");
const db = require("../models");
const methodOverride = require("method-override");
const axios = require("axios");
const isLoggedIn = require('../middleware/isLoggedIn')
const user = require("../models/user");
const router = express.Router();

const app = express();

app.use(methodOverride("_method"));

// GET show user Homepage
router.get("/", isLoggedIn, (req, res) => {
  db.user
    .findOne({
      where: { id: req.user.id },
      include: [db.playlist]
    })
    .then((user) => {
      user.getPlaylists({include:[db.song]}).then((playlist) => {
        const userInfo = { playlist: playlist, user: user };
        res.render("playlist/homepage", { userInfo });
      });
    });
});

// POST create a new playlist
router.post("/", isLoggedIn, (req, res) => {
  db.user
    .findOne({
      where: { id: req.user.id },
    })
    .then((user) => {
      db.playlist
        .findOrCreate({
          where: {
            name: req.body.name,
            userId: req.user.id
          },
        })
        .then(([playlist, created]) => {
          user.addPlaylists([playlist]).then((relationInfo) => {
            res.redirect("/playlist");
          });
        });
    });
});

// GET a specific playlist
router.get("/:id", isLoggedIn, (req, res) => {
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
router.get("/:id/search", isLoggedIn, (req, res) => {
  db.playlist
    .findOne({
      where: { id: req.params.id },
      include: [db.song],
    })
    .then((playlist) => {
      let track = req.query.songTitle;
      let songs = [];
      axios
        .get(`https://api.deezer.com/search?q=${track}`)
        .then((apiResponse) => {
          songs = apiResponse.data.data;
        })
        .then(() => {
          res.render("playlist/search", { songs, playlist });
        });
    });
});

// POST associate a song with a playlist
router.post("/:id/search", isLoggedIn, (req, res) => {
  db.playlist
    .findOne({
      where: { id: req.params.id },
    })
    .then((playlist) => {
      db.song
        .findOrCreate({
          where: {
            name: req.body.title,
            artist: req.body.artist,
            deezerId: req.body.deezerId,
            album: req.body.album,
            url: req.body.url,
          },
        })
        .then(([song, created]) => {
          console.log(song)
          playlist.addSongs([song]).then((relationInfo) => {
            res.redirect("back");
          });
        });
    });
});
 
//Put route to update playlist name
router.put("/:id", isLoggedIn, (req, res) => {
  db.playlist
    .update(
      {
        name: req.body.playlistName,
      },
      {
        where: { id: req.body.playlist },
      }
    )
    .then((playlist) => {
      res.redirect("/playlist");
    });
});

// DELETE playlist
router.delete("/:id", isLoggedIn, (req, res) => {
  console.log("In the delete route");
  db.playlist
    .destroy({
      where: { id: req.params.id },
    })
    .then(() => {
      res.redirect("/playlist");
    });
});

// DELETE song
router.delete("/:id/song", isLoggedIn, (req, res) => {
  db.playlistsSongs
    .destroy({
      where: {
        playlistId: req.params.id,
        songId: req.body.songId,
      },
    })
    .then(() => {
      res.redirect("back");
    });
});

module.exports = router;
