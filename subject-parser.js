var https = require("https");
const stream = require('stream');



// remove string before <.*> (usually </x>)
class FrontRemover extends stream.Transform {
  constructor(options) {
    super(options);
    this.state = 'paused'
    this.buffer = ''
  }

  _transform(chunk, encoding, cb) {
    if(this.state === 'paused' ){
      let str = chunk.toString('utf8')
      let i1 = str.indexOf('<')

      if(this.buffer !== '') {
        chunk = Buffer.concat([this.buffer, chunk])
      }

      // find '<'
      if(i1 >= 0) {
        let i2 = str.indexOf('>')
        if(i2 >= 0) {
          this.state = 'flow'
          cb(null, Buffer.from(str.substring(i2 + 1), 'utf8'))
        } else {
          this.buffer = chunk
        }
      }
    } else if(this.state === 'flow') {
      cb(null, chunk)
    }
  }
}

exports.getUserObj = function (userName, callback) {
  var options = {
    host: 'medium.com',
    path: '/@' + userName + '/latest',
    method: 'GET',
    port: 443,
    headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    }
  }
  var port = https
  var req = port.request(options, function(res) {
      var output = '';
      res.setEncoding('utf8');
      
			let remover = new FrontRemover()
      res.pipe(remover)
      remover.on('data', function (chunk) {
          output += chunk
      });
			
			res.on('error', function(err) {
				console.log(res.statusCode, ": ", err)
				callback(null, null, err)
			})
			
      res.on('end', function() {
          var obj = JSON.parse(output);
          callback(obj);
      });
  });
	
	req.on('error', (e) => {
		console.error(`problem with request: ${e.message}`);
	});

  req.end();
};


// api.getJSON('jonnaivin', (status, obj) => {
//   console.log(
//     JSON.stringify(obj, null, 2)
//   )
// })

// payload -> userNavItemList -> Post -> "f3ba31a23ade"(PostId) -> virtuals -> totalClapCount
//                                                              -> title
