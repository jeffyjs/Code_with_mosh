const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const courses = require('./routes/courses');
const home = require('./routes/home');
const logger = require('./middleware/logger');

const express = require('express');

const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');


const Joi = require ('joi');

const app = express();

//----------------Built-in Middleware--------------------------------------
// app.set('view engin','pug');
// app.set('views','./views');  // template engine

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);

//----------Configuration-----------------------------------
console.log('Application Name:' + config.get('name'));
console.log('Mail Server' + config.get('mail.host'));
console.log('Mail Password' + config.get('mail.password'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
   startupDebugger('Morgan enabled...')
}

dbDebugger('Connected to Database');

app.use(logger);

// app.use(function(req,res,next){
//     console.log('Authenticating...');
//     next();
// });
//----------------------------------------------------------------------




const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`Listening on port ${port}...`));