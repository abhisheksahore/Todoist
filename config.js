require('dotenv').config();

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {PORT, DATABASE_URL, SECRET_KEY};