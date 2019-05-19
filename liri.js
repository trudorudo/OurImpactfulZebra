
//users'scommands
var command = process.argv[2]
var songName = process.argv[3];
require('dotenv').config()
//spotify

if (songName == undefined){
    songName = "The Sign"
}
if (command === "spotify-this-song") {
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,

    secret: process.env.SPOTIFY_SECRET,

});


spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
        return console.log('Error occurred:' + err);
    } else
    // console.log(data)
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("The preview link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
         
         
    }

)};



//-----------------------------------------------------------------------

//OMBD

var axios = require("axios");

var movieName = process.argv[3];

if (movieName == undefined){
    movieName = "Mr. Nobody"
}
if (command === "movie-this") {
axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=cf3c7a2c").then(
    function (response) {
        
            // console.log(response.data);
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year of release: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie" + response.data.Actors);
        }
)}

//----------------------------------------------------------------------------
//Bands is in town

var artist = process.argv[3];
var command = process.argv[2]
var longitude = "";
var latitude = "";
if (command === "concert-this") {
     axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
// console.log(response.data);
            // console.log(response.data[0].datetime);
            longitude = response.data[0].venue.longitude
            // console.log(longitude);
            latitude = response.data[0].venue.latitude
            // console.log(latitude);

            //-----------------------------------------------------------------------
            //geocoder to identify location of the consert according to longitude and latitude (take from bandsintown)
            var NodeGeocoder = require("node-geocoder");

            var options = {
                provider: "mapquest",
                apiKey: "La93DqXZK92braYaMslB4QPtTzTbnOSA"
            };

            var geocoder = NodeGeocoder(options);
            // console.log(latitude);
            // console.log(longitude);

            geocoder.reverse({ lat: latitude, lon: longitude }, function (err, res) {
                console.log("Country: " + res[0].countryCode);
                console.log("City: " + res[0].city);
                console.log("State: " + res[0].stateCode);
                console.log("Zipcode: " + res[0].zipcode);
                console.log("Adress: " + res[0].streetName);
            });

        }
    )
}


// if (command == "do-what-it-says"){
// var fs = require("fs");
// fs.readFile("random.txt", "utf8", function (error, data) {
//     if (error) {
//         return console.log(error);
//     }
//     // console.log(data);
//     var dataArr = data.split(',');
//     console.log(dataArr);
//    command === "spotify-this-song"
//     songName === "I want it that way";
    
   


    
    




