const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/database.js');
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

db.connectDb();
app.use('/health-check', (req, res) => {
	res.send('Health check api');
});

app.listen(PORT, () => {
	console.log(`server is running on http://localhost:${PORT}`);
});
