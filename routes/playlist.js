const express = require('express')
const db = require('../models')
const methodOverride = require("method-override")
const axios = require('axios')
const router = express.Router()

const app = express()

app.use(methodOverride("_method"))

router.get("/", function (req, res) {
  // console.log(req.user)
  db.user
    .findOne({
      where: { id: req.user.id },
    })
    .then(function (user) {
      // userId = req.user.id
      user.getPlaylists().then(function (playlist) {
        const userInfo = { playlist: playlist, user: user }
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
      // console.log('In the playlist show route', playlist.name)
      // res.send('this is the playlist show page')
      res.render("playlist/show", { playlist: playlist })
    })
    .catch((error) => {
      res.status(400).render("main/404")
    });
});

// GET songs from the API to display on the playlist show page
router.get('/:id/search', function (req, res) {
  db.playlist
    .findOne({
      where: { 
        id: req.params.id 
    },
  })
  .then(function (playlist) {
    let artist = req.query.artist
    let track = req.query.track
    const lastFmUrl = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=54ecd3b57971473496ea1afe47a354a8&format=json`
    axios.get(lastFmUrl).then(function (apiResponse) {
      const songs = apiResponse.data.results.trackmatches.track
      console.log(songs, '++++++++++++++++++')
      console.log(playlist, '++++++++++++++++++')
      res.render('playlist/search', { songs, playlist })
        //  res.send('Oh, haiiiiiiiiiii')
    })
  })

  // console.log('In the GET songs route', req.params.id)
  // console.log(req.query.track)
  // console.log(req.query.artist)

    // console.log(songs.data)
    // console.log(songs.data.track.name)
    // console.log(songs.data.track.url)
    // console.log(songs.data.track.artist.name)
    // console.log(songs.data.track.album.image)
 


})

// GET songs from the API to display on the playlist show page -- WORKS W/O PLAYLIST 
// router.get('/:id/search', function (req, res) {
//   // console.log('In the GET songs route', req.params.id)
//   // console.log(req.query.track)
//   // console.log(req.query.artist)
//   let artist = req.query.artist
//   let track = req.query.track
//   const lastFmUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=54ecd3b57971473496ea1afe47a354a8&artist=${artist}&track=${track}&format=json`
//   axios.get(lastFmUrl).then(function (apiResponse) {
//     const songs = apiResponse
//     console.log(songs.data)
//     // console.log(songs.data.track.name)
//     // console.log(songs.data.track.url)
//     // console.log(songs.data.track.artist.name)
//     // console.log(songs.data.track.album.image)
//     res.send('Oh, haiiiiiiiiiii')
//     // res.render('playlist/search', { songs })
//   })
// })

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