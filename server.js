const http = require('http');
const fs = require('fs');
const _ = require('lodash');

//const username = gideongetich493
//const string = mongodb+srv://gideongetich493:<password>@myfirstnodeapp.xj7fr4d.mongodb.net/?retryWrites=true&w=majority&appName=myfirstnodeapp
//const password = 8aWVPgSf9CUUPJow
//<script src="https://cdn.tailwindcss.com"></script>

//https://jsonplaceholder.typicode.com/todos

const server = http.createServer((req, res) => {
    //console.log((req.url, req.method));
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('Hello');
    })
    greet();
    greet();
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('./views/home.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {

            res.end(data)
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log('Listening for request in port number 3000');
})