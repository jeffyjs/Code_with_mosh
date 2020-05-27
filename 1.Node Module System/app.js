
//--------------------------------------------- OS module ----------------------------------------------
 // const path = require('path');
    // var pathObj = path.parse(__filename);

    // console.log(pathObj);
//--------------------------------------------- PATH module ----------------------------------------------
// const os = require('os');

// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log(`Total Memory : ${totalMemory}`);
// console.log(`Free Memory : ${freeMemory}`);

//--------------------------------------------- OS module ----------------------------------------------

// const fs = require ('fs');

// fs.readdir('$', function (err,files) {
//     if (err) console.log('Error', err);
//     else console.log('Result', files);
// });

//--------------------------------------------- FS module ----------------------------------------------

// const EventEmitter = require ('events');
// const emitter = new EventEmitter();

// //register a listener
// emitter.on('messageLogged', function(){
//     console.log('Listener called');
// });
// // Raise  an event
// emitter.emit('messageLogged');
//--------------------------------------------- EVENT module ----------------------------------------------

// const EventEmitter = require ('events');
// const emitter = new EventEmitter();

// //register a listener
// emitter.on('messageLogged', (arg) => {
//     console.log('Listener called', arg);
// });
// // Raise  an event
// emitter.emit('messageLogged', { id:1, url:'http://' });
//--------------------------------------------- EVENT Arguments module ----------------------------------------------

// const EventEmitter = require ('events');
// const Logger = require ('./logger');

// const logger = new Logger();

//     //register a listener
//     logger.on('messageLogged', (arg) => {
//         console.log('Listener called', arg);
//     });

// logger.log('message');
//--------------------------------------------- Extending Event Emitter ----------------------------------------------

const http = require('http');

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }
    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

                                                                    // server.on('connection', (socket) =>{
                                                                    //     console.log('New connection...');
                                                                    // });
server.listen(3000);
console.log('Listening on port 3000...')



//--------------------------------------------- HTTP module ----------------------------------------------
