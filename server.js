// Here's a simple way to run this app locally.  '3000' chosen arbitrarily
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8000, () => {
    console.log('Listening on Port 8000...');
});
