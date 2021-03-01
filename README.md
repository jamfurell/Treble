# TREBLE
([click here for the link to our project hosted on Heroku!](https://treble-music.herokuapp.com/))

### PREVIEW 
![USER PLAYLIST PAGE](https://user-images.githubusercontent.com/74464186/109404547-1ac38b00-791c-11eb-9ed4-2a8210c52f90.png)
![SEARCH SONG PAGE](https://user-images.githubusercontent.com/74464186/109404552-21ea9900-791c-11eb-80a6-9db6030b97d1.png)


### ORIGINAL WIREFRAMES
([click here for the link to the original wireframe layout](https://xd.adobe.com/view/7981dbc9-fa11-4c51-8426-bfc11db31b05-2cd2/?fullscreen))
![Treble-Wireframes](https://user-images.githubusercontent.com/76925728/109405151-6aa55080-7922-11eb-8b1c-ae60238a95f2.PNG)

## PROJECT OVERVIEW 
HERE'S A BRIEF SUMMARY OF OUR APP

### USER STORIES
As a user, I want to create a profile containing a list of playlists.                                                                                             As a user, I want to create or delete a playlist along with editing the playlist name.                                                                             As a user, I want to view a specific playlist with all the songs in that playlist.                                                                                 As a user, I want to be able to search and add songs to that specific playlist. I also want to be able to delete songs from the playlist. 

## BASIC LAYOUT

#### Languages Written In
Node, EJS, HTML, CSS, BOOTSTRAP(v5)

#### LIST OF TECHNOLOGIES USED
Our team used all the technologies noted below to successfully run various functions in our app.  
* Axios
* BCrypt
* Connect-flash
* EJS Templating and EJS Layouts
* Morgan
* PostgreSQL
* Passport and passport-local 
* Sequelize and Sequelize-cli
* Sessions

#### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

#### Playlist Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| userId | integer | Foreign Key, Pulled from user DB |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

#### Song Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Pulled from Deezer API |
| artist | String | Pulled from Deezer API |
| album | String | Pulled from Deezer API |
| deezerId | String | Pulled from Deezer API |
| url | String | Pulled from Deezer API |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

#### PLAYLISTSSONGS (JOIN) TABLE 

Column Name | Data Type | Notes |
| ---------------- | ------------- | -------------- |
| id | Integer | Serial Primary Key, Auto-generated |
| playlistId | Integer | Foreign Key, Pulled from Playlist DB |
| songId | Integer | Foreign Key, Pulled from Song DB |


### INSTALLATION INSTRUCTIONS

##### 1. FORK AND CLONE RESPOSITORY TO YOUR GITHUB AND LOCAL REPOSITORY

##### 2. OPEN REPOSITORY AND RUN NPM INSTALL

```
npm install
```
(Or just `npm i` for short)

##### 3. CREATE NEW DATABASE NAMED: treble_database
RUN THE FOLLOWING CODE:

```
createdb: treble_database
```

##### 4. RUN THE MIGRATION

```
sequelize db:migrate
```

##### 5. CREAT A '.env' FILE AND INCLUDE THE FOLLOWING FIELD INSIDE

```
SESSION_SECRET=<any_random_string>
```

#### EXISTING FEATURE
Treble is a full stacked application that encompasses all the CRUD functionalities. 

| VERB | URL | Action (CRUD) | Description |
|------|-----|---------------|-------------|
| GET | /playlist | Index (Read) | lists all playlists associated with user|
| GET | /playlist/:id | Index (Read) | lists all songs associated with a specific playlist |
| GET | /playlist/:id/search | Index (Read) | lists all songs fetched from API|
| GET | /auth/signup | New (Read) | shows a form to create a new user account|
| POST | /playlist | Create (Create) | creates a playlist with the POST data|
| POST | /signup | Create (Create) | creates a new user with the POST data|
| GET | /playlist/:id | Show (Read) | list information about a specific playlist (i.e. /playlist/1)|
| GET | /playlist/:id/edit | Edit (Read) | shows a form for editting a specific playlist name (i.e. /playlist/edit/1)|
| PUT | /playlist/:id | Update (Update) | updates the data for a specific playlist (i.e. /playlist/1)|
| DELETE | /playlist/:id | Destroy (Delete) | deletes the playlist with the specified id (i.e. /playlist/1)|


### ARISING PROBLEM
Our group originally planned on using the lastFM API to fetch data for songs but we found that we could not access the album artwork/image. Thankfully, we were able to find another API (deezer API) that provided all the information we needed for our application. 
Our application primarily used BOOTSTRAP to style our page but there were times where style cutomization proved to be difficult. 


#### Contributor Githubs
* https://github.com/r-mckeith
* https://github.com/rauldtrejo
* https://github.com/jamfurell

