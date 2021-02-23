const express = require('express');
const db = require('../models');
const router = express.Router();

const app = express();

// GET a user's playlists
router.get('/', (req, res) => {
  db.user.findOne({
    where: { id: 1 },
    include: [db.playlist]
  }).then((user) => {
    console.log(user.playlists, '===========')
    console.log(user, '+++++++++++')
    res.send('The playlists of a user go here')
//     // res.render('/playlist/index', { user: user })
  })
})

// GET a form for creating a new playlist
router.get("/new", (req, res) => {
  res.send('This is a form to create a new playlist')
  // res.render("playlist/new")
})

// POST a new playlist
router.post("/:id", (req, res) => {
  db.playlist.findOrCreate({
      where: {
        name: req.body.name
      }
    }).then(function ([playlist, created]) {
      db.category
        .findOrCreate({
          where: {
            name: req.body.category,
          },
        })
        .then(function ([category, created]) {
          project.addCategory(category).then(function (relationInfo) {
            res.redirect("/playlist/show");
          });
        });
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

// // GET a new playlist form
// router.post('/', function(req, res) {
//   db.pokemon.create({
//     name: req.body.name,
//   }).then(function(poke) {
//     res.redirect('/pokemon')   
//   })   
// })
  
//   router.get('/:id', function(req, res) {
//     db.pokemon.findByPk(req.params.id).then(function(poke) {
//       const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${ poke.name }`
//       axios.get(pokemonUrl).then( function(apiResponse) {
//         const pokemon = apiResponse.data
//         res.render('pokemon/show', { pokemon: pokemon });  
//       })
//     })
//   })
  
//   router.delete('/:id', function(req, res) {
//     db.pokemon.destroy({
//       where: { id: req.params.id }  
//     }).then(function() { 
//       res.redirect('/pokemon')
//     })
//   })
  
  module.exports = router;   