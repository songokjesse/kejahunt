const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('../src/routes');
const  app = express();

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//handle cors
// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
//   next();
// });


// API ROUTES
app.use('/api/v1', routes);

//catch 404 and forward to error handler
app.use((req,res,next)=>{
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err,req,res,next)=>{
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
