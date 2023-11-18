const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const get_webhook_data = require('./middlewares/get_webhook_data');
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/create', async (request, response) => {
	try {
        await get_webhook_data(request,response)
    } catch (error) {
        response.status(500).json({
            message: "There was an error"
        })
    }
});

app.listen(PORT, HOST, () => {
	console.log(`Port running at http://localhost:${PORT}`);
});
