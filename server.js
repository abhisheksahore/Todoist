
const app = require('./app.js');
const {PORT} = require('./config.js');
const {DATABASE_URL} = require('./config.js');
const mongoose = require('mongoose');

mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log(`Connected to MongoDB Database.`));

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})