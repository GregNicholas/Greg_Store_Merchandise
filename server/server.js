import express from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';
import cors from 'cors';

/**
 * Connect to redis
 */
const client = redis.createClient();
await client.connect();
client.on('connect', function (err) {
	if (err) {
		console.log('Could not establish a connection with Redis. ' + err);
	} else {
		console.log('Connected to Redis successfully!');
	}
});

const app = express();
const port = 5001;

app.use(cors({
	origin: 'http://localhost:3000'
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('In the server');
});

app.get('/getCards', async (req, res) => {
	const cards = await client.lRange("products", 0, -1)
	res.send(cards);
});

app.post('/createCard', async (req, res) => {
	await client.lPush("products", JSON.stringify(req.body));
	const updatedCards = await client.lRange("products", 0, -1);
	res.send(updatedCards);
})

app.put('/editProduct/:id', async (req, res) => {
	await client.lRem("products", 1, JSON.stringify(req.body.oldProduct));
	await client.lPush("products", JSON.stringify(req.body.product));
	const updatedCards = await client.lRange("products", 0, -1);
	res.send(updatedCards);
})

app.delete('/deleteProduct/:id', async (req, res) => {
	await client.lRem("products", 1, JSON.stringify(req.body));
	const updatedCards = await client.lRange("products", 0, -1)
	res.send(updatedCards);
})

app.listen(port, () => console.log(`Running on port: ${port}`));
