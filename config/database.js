const process = require('process');

module.exports = {
    database: process.env.MONGO_URI || 'mongodb+srv://saadmusema3:admin@bookreservationdatabase.h7qvq.mongodb.net/?retryWrites=true&w=majority&appName=BookReservationDatabase',
    secret: 'your_jwt_secret'
  };