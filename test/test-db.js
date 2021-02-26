const db = require('../models')

db.user.create({
  name: 'bob',
  email: 'bob@bob.com',
  password: 'password'
}).then(function (createdUser) {
  console.log(createdUser)
})

db.playlist.create({
  name: 'summertime',
  userId: 1
}).then(function (createdUser) {
  console.log(createdUser)
})

db.playlist.create({
  name: 'roadtrip',
  userId: 2
}).then(function (createdUser) {
  console.log(createdUser)
})

// // // Create an associated Item using helper method createModel (createPet)
// db.user.findOne().then(function (foundUser) {
//   foundUser.createPet({
//     name: 'Elaine Benes',
//     species: 'German Shepard'
//   }).then(function (createdPet) {
//     console.log(createdPet)
//   })
// })