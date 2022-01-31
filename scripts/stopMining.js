const client = require('./client');

// invoke "stopMining"
client.request('stopMining', [], function(err, response) {
  if(err) throw err;
  console.log(response.result); // success
});