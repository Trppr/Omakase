var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var request = require('request');
var bodyParse = require('body-parser');
var db = require('./database/db.js');
var searchRouter = require('./router/searchRouter.js');
var userRouter = require('./router/userRouter.js');
var dishRouter = require('./router/dishRouter.js');
var searchGoogleRouter = require('./router/searchGooglePlacesRouter.js');
var googleLocation = require('./router/googleLocation.js');
var photoRouter = require('./router/photoRouter.js');
var galleryRouter = require('./router/galleryRouter.js');

app.use(cors());
app.use(bodyParse.json({limit: '50mb'}));

app.use(express.static('./client'));

app.use('/api/google', searchGoogleRouter);
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/dish', dishRouter);
app.use('/api/location', googleLocation);
app.use('/api/photo', photoRouter);
app.use('/api/gallery', galleryRouter);

app.get('*', function (request, response){
  response.sendFile(path.resolve('./client', 'index.html'));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  db.ensureSchema();
  console.log('we are now listening on ', app.get('port'));
});
