const express = require('express');
const app = require('app');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use('/health-check', (req, res) => {
	res.send('Health check api');
});

app.listen(PORT, () => {
	console.log(`server is running on http://localhost:${PORT}`);
});
