
var command = process.argv[2];
var request = require('request');
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

switch (command) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifyThis();
		break;
	case "movie-this":
		movieThis();
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
	default:
		console.log("===============================================\nPlease follow one of the following formats:\nnode liri.js my-tweets\nnode liri.js spotify-this-song '<song name here>'\nnode liri.js movie-this '<movie name here>'\nnode liri.js do-what-it-says\n===============================================");
};

function myTweets (){
	var client = new Twitter(keys.twitterKeys);
	var params = {screen_name: 'e98wruoifdjll'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
	  		for (var i = 0; i < tweets.length; i++) {
	  		console.log("- " + tweets[i].text);
	  		}
	  	} else if (error) {
	  	console.log(error);
	  	}
	});
}

function spotifyThis (){
	console.log(keys.spotifyKeys);
	var spotify = new Spotify(keys.spotifyKeys);
	var song = "hello";
	spotify.search({ type: 'track', query: song}, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}	
		console.log(data);
	});
	// This will show the following information about the song in your terminal/bash window
	// Artist(s)
	// The song's name
	// A preview link of the song from Spotify
	// The album that the song is from
	// If no song is provided then your program will default to "The Sign" by Ace of Base.
};

function movieThis (){
	var movieName = "";
	var args = process.argv;
	for (var i = 3; i < args.length; i++) {
	  if (i > 3) {
	    movieName = movieName + "+" + args[i];
	  } else {
	    movieName += args[i];
	  }
	}
	console.log("Our movie is", movieName);
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
	  if (!error && response.statusCode === 200) {

	    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
	    // This will output the following information to your terminal/bash window:
		//    * Title of the movie.
		//    * Year the movie came out.
		//    * IMDB Rating of the movie.
		//    * Rotten Tomatoes Rating of the movie.
		//    * Country where the movie was produced.
		//    * Language of the movie.
		//    * Plot of the movie.
		//    * Actors in the movie.
	  } 
	// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
	});
}

function doWhatItSays () {
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
}