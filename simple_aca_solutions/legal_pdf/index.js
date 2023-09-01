const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Route = require('./routes/router');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.json());

app.use(Route);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, HOST, () => {
	console.log(`Port running at http://localhost:${PORT}`);
});
