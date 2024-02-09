//https://stackoverflow.com/questions/5998694/how-to-create-an-https-server-in-node-js
/*
Basic http server saying hello world

var http = require('http');

http.createServer(function (req, res) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('Hello World!');
    response.end();
}).listen(8080)
*/




const https = require('https');
const fs = require('fs');
const path = require('path');

let mimetypes = {
    "css":"text/css",
    "html":"text/html"
}

const certDir = '/etc/letsencrypt/live';
const domain = 'trollgod.xyz';
const options = {
    key: fs.readFileSync('${certDir}/${domain}/privkey.pem'),
    cert: fs.readFileSync('${certDir/${domain}/fullchain.pem')
};

const websites = require('./websites');

let server = https.createServer(options, function(request, response){
    const domain = request.headers.host.split(':')[0];
    const websiteDir = websites[domain];
    if (!websiteDir) {
        //if website requested not in website list, 404
        response.writeHead(404);
        response.end('404 Not Found')
        return;
    }



    const filePath = path.join(websiteDir, request.url);
    fs.readFile(filePath, function(err, content){
        if (err) {
            console.log("Error: " + err);

            //gives 400 status code if page not found
            response.statusCode = 404;
            response.end(STATUS_CODES[response.statusCode] + "\r\n");
            return;
        }


        //200 is http code for good request
        //content-Type is the object or content header
        const ext = path.extname(request.url).slice(1);
        response.writeHead(200, {'Content-Type': mimetypes[ext] || 'text/plain' });     // Use mimetypes[ext] or use text/plain if not in mimetypes
        response.write(content);
        response.end();
    }) //fs.readFile

    
}) //create.Server

const port = 443;
server.listen(port, function() {
    console.log("Server has started!");
});







