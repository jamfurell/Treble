const express = require('express')
const db = require('../models')
const methodOverride = require("method-override")
const axios = require('axios')
const router = express.Router()

const app = express()

app.use(methodOverride("_method"))

router.get("/", function (req, res) {
  // console.log("=====This is req.user ==>", req.user, " <=======")
  db.user
    .findOne({
      where: { id: req.user.id },
    })
    .then(function (user) {
      // userId = req.user.id
      
      user.getPlaylists().then(function (playlist) {
        const userInfo = { playlist: playlist, user: user }
        // console.log("=====This is userInfo ==>", userInfo, " <=======")
        // console.log(playlist[0].name, user.name)
        res.render("playlist/homepage", { userInfo })
      })
    })
})

// POST create a new playlist
router.post("/", (req, res) => {
  db.user
    .findOne({
      where: { id: req.user.id },    
      // <=====req.user.id is accessible through all pages?
    })
    .then(function (user) {
      db.playlist.findOrCreate({
        where: {
          name: req.body.name
        },
      })
        .then(function ([playlist, created]) {
          user.addPlaylists([playlist]).then(function (relationInfo) {
            res.redirect('/playlist')
          })
        })
    })
})

// GET a specific playlist
router.get("/:id", (req, res) => {
  db.playlist
    .findOne({
      where: { id: req.params.id }
    })
    .then((playlist) => {
      if (!playlist) throw Error()
      console.log('In the playlist show route')
      console.log("====The playlist from specific playlist get====>", playlist, "<=======")
      res.render("playlist/show", { playlist: playlist })
    })
    .catch((error) => {
      // res.status(400).render("main/404")
    });
});

// GET songs from the API to display on the playlist show page
router.get('/:id/search', function (req, res) {
  console.log('In the GET songs route')
  console.log(req.query.track)
  console.log(req.query.artist)
  let artist = req.query.artist
  let track = req.query.track
  const lastFmUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${track}&api_key=54ecd3b57971473496ea1afe47a354a8&format=json`
  axios.get(lastFmUrl).then(function (apiResponse) {
    const songs = apiResponse
    console.log(songs)
    res.send('Oh, haiiiiiiiiiii')
    // res.render('playlist/search', { songs })
  })
})

// POST add a song to the database
router.post('/', (req, res) => {
  db.playlist
    .findOrCreate({
      where: {
        id: req.params.id
      },
    })
    .then(function (playlist) {
      db.song.findOrCreate({
        where: {
          name: req.body.name,
          artist: req.body.artist,
          album: req.body.album,
          lastFmId: req.body.lastFmId
        },
      })
        .then(function ([song, created]) {
          playlist.addSong(song).then(function (relationInfo) {
            res.redirect('/')
          })
            .catch((error) => {
              res.status(400).render("main/404")
            });
        });
    })
})

// DELETE playlist 
router.delete('/:id', function (req, res) {
  console.log('In the delete route')
  db.playlist
    .destroy({
      where: { id: req.params.id }
  }).then(function () {
    res.redirect('/playlist')
  })
})

module.exports = router;   