import express from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('In the server');
});


// GET
// POST
// PUT
// DELETE

// EXAMPLE
app.get('/getCards', async (req, res) => {
	// Please finish the logic in retrieving the cards from redis
	await client.set('key', JSON.stringify({ hello: 'world' }));
	// await client.set('card')
	const value = await client.get('key');
	res.send({ value: JSON.parse(value) });
});

app.post('/createCard', async (req, res) => {
	const newCard = { id: 1, productName: "widgetzpinner", productImg: "https://picsum.photos/id/10/200", description: "Very awesome widget spinner, best ever", creationTime: new Date() }
	await client.set('card', JSON.stringify(newCard));
	const card = await client.get('card');
	return res.json(JSON.parse(card))
})

app.listen(port, () => console.log(`Running on port: ${port}`));
