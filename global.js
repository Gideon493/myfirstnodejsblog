const { people, ages } = require('./module');
const os = require('os');
const fs = require('fs');
console.log(people);
console.log(ages);
console.log(os.platform());
console.log(os.homedir());

fs.readFile('./docs/gid.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data.toString());
    }
})