const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
    // opciones default para conectar se mongoose
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
});