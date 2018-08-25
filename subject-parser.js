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

function getJSON (userName, callback) {
  var options = {
    host: 'medium.com',
    path: '/@' + userName + '?format=json',
    method: 'GET',
    port: 443,
    headers: {
        'Content-Type': 'application/json'
    }
  }
  console.log("rest::getJSON");
  var port = https
  var req = port.request(options, function(res)
  {
      var output = '';
      console.log(options.host + ':' + res.statusCode);
      res.setEncoding('utf8');
      let remover = new FrontRemover()
      res.pipe(remover)
      remover.on('data', function (chunk) {
          output += chunk
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          onResult(res.statusCode, obj);
      });
  });

  req.on('error', function(err) {
      console.log(err)
      //res.send('error: ' + err.message);
  });

  req.end();
};

var options = {

};


// api.getJSON('jonnaivin', (status, obj) => {
//   console.log(
//     JSON.stringify(obj, null, 2)
//   )
// })

// payload -> userNavItemList -> Post -> "f3ba31a23ade"(PostId) -> virtuals -> totalClapCount
//                                                              -> title

export default getJSON