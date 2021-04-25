const http = require('http'); // global module provided by nodejs

const routes = require('./prove01-routes'); // custom file, use relative path, routes = requestHandler from prove01-routes

// this function will be called whenver a request reaches the server; http.createServer returns a server, so we store it into a const
const server = http.createServer(routes);
    //console.log(req.url, req.method, req.headers);

server.listen(3000); // nodejs will listen for a incoming request