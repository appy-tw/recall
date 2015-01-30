var http = require('http');
var connect = require('connect');
var url = require('url');
var proxy = require('proxy-middleware');
var port = process.env.PORT || 3000;

var app = connect();

app.use('/', connect.static('./app'));
app.use('/proxy', proxy(url.parse('http://www.ris.gov.tw')));

http.createServer(app).listen(port);

