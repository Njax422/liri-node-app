
var command = process.argv[2];
var request = require('request');
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');

var switchFunc = function (command, functInfo) {
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
}

var runSwitch = function(arg1, arg2) {
	switchFunc(arg1, arg2);
};

runSwitch(process.argv[2], process.argv[3]);

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

var getNames = function(artist) {
	return artist.name;
}

function spotifyThis (song){
	var spotify = new Spotify(keys.spotifyKeys);
	var song = "";
	var args = process.argv;
	for (var i = 3; i < args.length; i++) {
	  if (i > 3) {
	    song = song + "+" + args[i];
	  } else {
	    song += args[i];
	  }
	}
	spotify.search({ type: 'track', query: song}, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}
		var songInfo = data.tracks.items;
		for (var i = 0; i < songInfo.length; i++) {
			console.log(i);
			console.log("artist(s): ", songInfo[i].artists.map(getNames));
			console.log("song name: ", songInfo[i].name);
			console.log("preview song: ", songInfo[i].preview_url);
			console.log("album: ", songInfo[i].album.name, "\n");

		}
	});
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
	console.log("Search terms: ", movieName);
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece",function(error, response, body) {
			if (!error && response.statusCode === 200) {
			var data = JSON.parse(body);
			console.log("\n");
		 	console.log("Title: " + data.Title);
		 	console.log("Year: " + data.Year);
		 	console.log("IMDB Rating: " + data.imdbRating);
		 	console.log("Country: " + data.Country);
		 	console.log("Language: " + data.Language);
		 	console.log("Plot: " + data.Plot);
		 	console.log("Actors: " + data.Actors);
		 	console.log("\n");
		  } 
	});
}


function doWhatItSays () {
	fs.readFile('random.txt', 'utf8', function (err, data) {
		if (err)throw err;
		var data = data.split(',');
		console.log(data);
		if (data.length == 2) {
			switchFunc(data[0], data[1]);
		}
	});
}







