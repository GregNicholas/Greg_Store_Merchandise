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

const errorHandler = (error, request, response, next) => {
	// Error handling middleware functionality
	console.log( `error from handler: ${error.status}`) // log the error
	const status = error.status || 400
	// send back error message 
	response.status(status).send(error.message)
}

app.get('/', (req, res) => {
	res.send('In the server');
});

app.get('/getProducts', (req, res, next) => {
	client.lRange("products", 0, -1)
	 .then(products => products.map(JSON.parse))
	 .then(products => res.send(products))
	 .catch(next)
});

app.post('/createCard', async (req, res, next) => {
	try {
		await client.lPush("products", JSON.stringify(req.body));
		const data = await client.lRange("products", 0, -1);
		const updatedCards = data.map(JSON.parse);
		res.send(updatedCards);
	} catch(err) {
		next(err)
	}
})

app.put('/editProduct/:id', async (req, res, next) => {
	try {
		await client.lRem("products", 1, JSON.stringify(req.body.oldProduct));
		await client.lPush("products", JSON.stringify(req.body.product));
		const data = await client.lRange("products", 0, -1);
		const updatedCards = data.map(JSON.parse);
		res.send(updatedCards);
	} catch(err){
		next(err)
	}
})

app.delete('/deleteProduct/:id', async (req, res, next) => {
	try {
		await client.lRem("products", 1, JSON.stringify(req.body));
		const data = await client.lRange("products", 0, -1);
		const updatedCards = data.map(JSON.parse);
		res.send(updatedCards);
	} catch(err){
		next(err)
	}
})

app.delete('/deleteMultipleProducts', async (req, res, next) => {
	try {
		await Promise.all(req.body.map(product => {
			return client.lRem("products", 1, JSON.stringify(product))
		}));
		const data = await client.lRange("products", 0, -1);
		const updatedCards = data.map(JSON.parse);
		res.send(updatedCards);
	} catch(err){
		next(err)
	}
})

app.use(errorHandler)

app.listen(port, () => console.log(`Running on port: ${port}`));
