var request = require('request');

exports.gallery = {
	getPhotos: getPhotos
}

 function getPhotos(req, res) {
  request.get({
    headers: {'Authorization': 'Bearer 0e65893d52373958c6c062088a3f100d3a6cfda7'},
    url: 'https://api.imgur.com/3/album/3plS8/images',
  }, function(error, reponse, body) {
		//console.log("response for get Photos after request:", res);
		if (error) {
			res.status(500).send(error);
		}
		else {
			//console.log("response inside of get Photos: ", JSON.parse(body));
			res.send(JSON.parse(body));
		}
	});
}
