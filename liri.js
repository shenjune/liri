// 'use strict';

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. (from https://www.npmjs.com/package/dotenv). 
// zero-dependancy means the module doesn't depend on any other packages to function
// npm install dotenv was run in the terminal (dotenv folder showed up)
// the require function imports modules that exist in separate files.
require('dotenv').config();

// Load the fs package to read and write
var fs = require("fs");

// importing the node-spotify-api
// This is a universal wrapper/client for the Spotify Web API that runs on Node.JS and the browser
var Spotify = require('node-spotify-api');

// importing the api keys
var keys = require('./keys');

// importing axios npm package
// axios is a promise based http (like ajax) for the browser and node.js
// npm install axios was run in the terminal (created {}package-lock.json)
var axios = require('axios');

// npm i moment was run to install moment.js
// with moment.js installed we access time/date data for our purposes
var moment = require('moment');


// The Node.js file system module allows you to work with the file system on your computer (w3 schools).
// common uses of the require() method: create, read, delete, update, rename files
var fs = require('fs');

// initializing the spotyfy api client using my id and secret
// var spotify gets the value of new Spotify which in turn contains the secret key and the already assign value to spotify 
var spotify = new Spotify(keys.spotify);

// searching for music
// variable declared gets the value of the function being defined and its parameter
var getmeSpotify = function (songName) {
    // if song requested can not be found pass the hard coded song to songName variable
    if (!songName) {
        songName = 'defiying gravity';
    }
    // using the variable spotify with its value of keys and api library for spotify we run a search for track and song name limiting the results to 10
    spotify.search({
        type: 'track',
        query: songName,
        limit: 10
    }).then(function (response) {

        // variable songs is getting the value contained in the object retrieved from the api accessed via dot notation
        var songs = response.tracks.items;

        // for loop to go trhough the number of songs retrieved 
        for (var i = 0; i < songs.length; i++) {

            // for loop to match the artists to the songs found
            for (var j = 0; j < songs[i].artists.length; j++) {
                console.log('=====  THESE ARE THE RESULTS FROM YOUR SEARCH  =====')
                console.log('Performer: ' + songs[i].artists[j].name);
            };
            console.log('Song: ' + songs[i].name);
            console.log('Song preview: ' + songs[i].preview_url);
            console.log('From the album: ' + songs[i].album.name);
            console.log('==================================================');
        };
    });
};

// const omdb = new (require('omdbapi'))('68c2d4d3');
// capturing the input values
var firstInput = process.argv[2];
var secondInput = process.argv[3];

var findMovie = function (movieName) {
    if (!movieName) {
        secondInput = 'Twister';
    }
    var queryURL = "http://www.omdbapi.com/?t=" + secondInput + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(function (res) {
        // console.log(res.data.Ratings);

        // since the data is already an object(s) I was unable to parse() it but I am able to stringify() it
        var jsonData = JSON.stringify(res.data.Ratings);
        // console.log(jsonData);

        // now that I have the data I need as a string I am able to parse() it and can access it via dot notation
        var tomatoes = JSON.parse(jsonData);
        // console.log(tomatoes);
        // console.log(res);

        console.log('=====  YOUR RESULTS ARE  =====');
        console.log('Title: ' + res.data.Title);
        console.log('Release year: ' + res.data.Year);
        console.log('IMBD Rating: ' + res.data.imdbRating);
        console.log('Tomatoes Rating: ' + tomatoes[1].Value);
        console.log('This movie was produced in: ' + res.data.Country);
        console.log('Language: ' + res.data.Language);
        console.log('Plot: ' + res.data.Plot);
        console.log('Actors: ' + res.data.Actors);
        console.log('===============================');
    }).catch(function (error) {
        // handle error
        console.log('that exact match was not found, please try again');
    });
};



// searching for bands
var findBand = function (artist) {
    if (!artist) {
        artist = 'the beach boys';
    }
    var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';

    axios.get(queryURL).then(
        function (response) {
            // console.log(response);

            var secondInput = response.data;
            // console.log(secondInput);

            for (var i = 0; i < secondInput.length; i++) {
                var show = secondInput[i];
                console.log('==========  YOUR RESULTS FOR ' + show.lineup[0] + ' ARE  =================');
                console.log('Venue: ' + show.venue.name);
                console.log('City: ' + show.venue.city + ', ' + show.venue.region);
                console.log('Date & Time of Show: ' + moment(show.datetime).format('MM/DD/YYYY hh:00 A'));
                console.log('=========================================================');
            };
            
        }
    ).catch(function (error) {
        // handle error
        console.log(error);
    });
};

var doWhatItSays = function () {
    // accessing the random.txt file using the fs.readfile method
    // function with error and data parameters is part of the fs.read file method
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // dataArr gets what random.txt has and uses the .split() method to separate the objects in the new array
        var dataArr = data.split(",");
        // console.log('data contains this --> ' + data);

        // after split() doThis gets 'spotify-this-song' and and dothisToo gets 'God I hate Shakespeare'
        // console.log('dataArr at 0 has --> ' + dataArr[0]);
        // console.log('dataArr at 1 has --> ' + dataArr[1]);
        firstInput = dataArr[0];
        secondInput = dataArr[1];

        // run the function with its parameters
        whichFunction(firstInput, secondInput);
    });
};


var whichFunction = function (firstInput, secondInput) {
    if (firstInput === 'spotify-this-song') {
        getmeSpotify(secondInput);
    } else if (firstInput === 'concert-this') {
        findBand(secondInput);
    } else if (firstInput === 'movie-this') {
        findMovie(secondInput);
    } else if
        (firstInput === 'do-what-it-says') {
        doWhatItSays();
    }
};

whichFunction(firstInput, secondInput);
