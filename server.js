const express = require('express');
var bodyParser = require('body-parser')
var api = require('./server-api')
var getUserObj = require('./subject-parser').getUserObj

const app = express();
const port = process.env.SPORT || 8000;

var jsonParser = bodyParser.json();

// app.post('/Authorization/authURL', jsonParser, (req, res) => {
  // if(!req.body.nextPath){
    // res.send({ authURL:  api.authURL});
  // } else {
    // res.send({ authURL:  api.getAuthURL(req.body.nextPath)});
  // }
// });

app.post('/GET/authurl', jsonParser, (req, res) => {
  if(!req.body.reqData){
    res.send({resData: api.authURL});
  } else {
    res.send({resData: api.getAuthURL(req.body.reqData)});
  }
});

app.post('/GET/access', jsonParser, (req, res) => {
	api.exchangeAuthorizationCode(req.body.reqData).then((tokens) => {
		res.send({resData: tokens})
	}).catch((error) => {
		console.log("Fail to get access token: ", error)
		res.status(500).send({resError: 'Medium server error: can\'t get tokens with authorization code'})
	})

})


app.post('/GET/user', jsonParser, (req, res) => {
	api.getUser(req.body.reqData).then((data) => {
		res.send({resData: data})
	}).catch((error) => {
    if(error.message === 'Token was invalid.' ) {
      res.status(401).send({resError: 'Token was invalid'})
    } else {
      console.log("Fail to get user info: ", error)
      res.status(500).send({resError: 'Medium server error: can\'t get user info'})
    }
	})
})

app.post('/v1/user_object', jsonParser, (req, res) => {
	getUserObj(req.body.reqData, (obj, err) => {
		if(!err) {
			res.status(200).send({resData: obj})
		} else {
			console.log("Fail to get User Object: ")
			res.status(500).send({resError: 'get User Object Error'})
		}
	})
})



app.listen(port, () => console.log(`Listening on port ${port}`));


// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
