const fs = require('fs'); // import this to work with the file system

const requestHandler = (req, res) => {

    const url = req.url; // store the url into a const variable
    const method = req.method // such as get, post...
    //let username = "";

    // this is the default url: "/", if there is nothing after localhost:3000, then it will be this "/"
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><h1>Welcome to the main page. Hello from node.js backend!</h1></body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit Username</button></form></body>');
        res.write('</html>');
        return res.end(); // we must return it here, so it will not keep running the codes down below
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<title>This is a users page</title>');
        res.write('<body><h1>Welcome to the users page!</h1></body>');
        res.write('<ul>');
        res.write('<li>Jamal Murray</li>');
        res.write('<li>Lebron James</li>');
        res.write('<li>Donovan Mitchell</li>');
        //res.write('<li>' + username + '</li>');
        res.write('</ul>');
        res.write('</html>');
        return res.end();
    }

    // if the user submits the form, then it will go into here 
    if (url === '/create-user' && method === 'POST') {

        const body = [];
        // data event will be fired whenever a chunk is ready to be read
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            // we got all the chunks, and now we need "buffer" which is like a bus stop to interact with the data
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody); // this will look like this: message="whatever user input"
            const username = parseBody.split('=')[1]; // we only want the user input which is the element right one the = sign, so we use split here

            // write a simple message into a file named message.txt, shouldn't use "sync" cause that will block the code
            fs.writeFile('message.txt', username, (error) => {
                //console.log(error);
                res.statusCode = 302; // redirect
                res.setHeader('Location', '/users');
                return res.end();
            });
        })
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><h1>Hello from nodejs code</h1></body>');
    res.write('</html>');
}

module.exports = requestHandler;