const express = require('express');
const db = require('../models');
const router = express.Router();

const app = express();

// GET a user's playlists
// router.get('/', (req, res) => {
//   db.user.findOne({
//     where: { id: req.user.id },
//     // include: [db.playlist]
//   }).then((user) => {
//     user.getPlaylists().then((playlists) => {
//       res.render('playlist', { playlist, user })
//     })
//   })
// })

router.get("/", function (req, res) {
  db.user
    .findOne({
      where: { id: req.user.id },
    })
    .then(function (user) {
      user.getPlaylists().then(function (playlist) {
        const userInfo = { playlist: playlist, user: user}
        console.log(playlist[0].name, user.name)
        res.render("playlist/homepage", { userInfo });
      });
    });
});

// POST create a new playlist
router.post("/", (req, res) => {
  db.playlist.findOrCreate({
      // where: { 
      //   name: req.body.name, 
      //   userId: req.body.userId
      // }
      where: { 
        name: 'zen',
        userId: 1 
      }
    }).then(function ([playlist, created]) {
      // res.redirect('/')
      console.log('In the playlist create route', playlist)
    });
});

// GET display a specific playlist
router.get("/:id", (req, res) => {
  db.playlist
    .findOne({
      // where: { id: 1}
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
router.delete('/:id', function(req, res) {
  db.playlist.destroy({
    where: { id: req.params.id }  
  }).then(function() { 
    res.redirect('/')
  })
})
  
  module.exports = router;   