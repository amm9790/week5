var express = require('express');
var app = express();
var session = require('express-session');
var nedbstore = require('nedb-session-store')(session);

// https://github.com/kelektiv/node-uuid
// npm install uuid
const uuidV1 = require('uuid/v1');

app.use(
	session(
		{
			secret: 'secret',
			cookie: {
				 maxAge: 365 * 24 * 60 * 60 * 1000   // e.g. 1 year
				},
			store: new nedbstore({
			 filename: 'sessions.db'
			})
		}
	)
);

app.get('/', function(req, res) {
  if (!req.session.userid) {
  	req.session.userid = uuidV1();
  }
  
  res.send('session user-id: ' + req.session.userid + '. ');
});


app.listen(80, function(){
    console.log('Example app listening on port 80!');
    });
