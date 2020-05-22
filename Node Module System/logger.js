

// console.log(__filename);
// console.log(__dirname);

// var url = 'http://mylogger.io/log';

// function log(message){
//     console.log(message);
// }

// module.exports = log;
 
//--------------------------------Modeule function ----------------------------------

const EventEmitter = require ('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
     log (message){
    //send HTTP requet
    console.log(message);
    // Raise  an event
    this.emit('messageLogged', { id:1, url:'http://' });
    }
 }

module.exports = Logger;