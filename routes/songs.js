const express = require('express')
const db = require('../models')
const axios = require('axios')
const methodOverride = require("method-override")
const router = express.Router()

const app = express()

app.use(methodOverride("_method"))

// GET songs from the API and display on playlist show page
// router.get('/', function (req, res) {
//   console.log('In the GET songs route', req.user)
//   let artist = req.body.artist
//   let track = req.body.track
//   const lastFmUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${track}&api_key=54ecd3b57971473496ea1afe47a354a8&format=json`
//   axios.get(lastFmUrl).then(function (apiResponse) {
//     const songs = apiResponse.data.results
//     res.render('playlist/search', { songs })
//   })
// })

// router.get("/", (req, res) => {
//   db.playlist
//     .findOne({
//       where: { id: req.params.id }
//     })
//     .then((playlist) => {
//       if (!playlist) throw Error()
//       console.log('In the playlist show route', playlist)
//       res.render("playlist/show", { playlist: playlist })
//     })
//     .catch((error) => {
//       res.status(400).render("main/404")
//     });
// });
// // PUT add songs to a playlist
// router.put("/:id", function (req, res) {
//   db.playlistsSongs.
//   .findOne({
//     where: { id: req.params.id }
//   })
//     .then((playlist) => {
//       if (!playlist) throw Error()
//       console.log('In the playlist show route', playlist)
//       res.render("playlist/show", { playlist: playlist })
//     })
//     .catch((error) => {
//       res.status(400).render("main/404")
//     });
// });
// db.project
//   .update(
//     {
//       name: req.body.name,
//       githubLink: req.body.githubLink,
//       deployLink: req.body.deployedLink,
//       description: req.body.description,
//     },
//     {
//       where: { id: req.params.id },
//     }
//   )
//   .then(function () {
//     db.project
//       .findOne({
//         where: {
//           id: req.params.id,
//         },
//       })
//       .then(function (project) {
//         db.category
//           .findOrCreate({
//             where: {
//               name: req.body.category,
//             },
//           })
//           .then(function ([category, created]) {
//             project.setCategories([category]).then(function (relationInfo) {
//               res.redirect("/");
//             });
//           });
//       });
//   });


module.exports = router;  