let http = require('http');

let server = http.createServer(function(req,res){
  console.log('response for request');
  res.end('<h1>Witaj świecie</h1>');
})

server.listen(3000);
