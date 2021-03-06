const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/flights', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
const db = mongoose.connection;

db.on('connected', function(){
    console.log(`Connected to mongoDB at ${db.host}:${db.port}`)
});