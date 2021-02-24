const express = require('express')
const router = express.Router()
const methodOverride = require("method-override")
const db = require('../models')


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

// GET display a specific playlist
router.get("/:id", (req, res) => {
  db.playlist
    .findOne({
      where: { id: req.params.id }
    })
    .then((playlist) => {
      if (!playlist) throw Error()
      console.log('In the playlist show route', playlist)
      res.send('This is a single playlist')
      // res.render("playlist/show", { playlist: playlist })
    })
    .catch((error) => {
      res.status(400).render("main/404")
    });
});

// POST edit playlist
router.post('/:id')

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