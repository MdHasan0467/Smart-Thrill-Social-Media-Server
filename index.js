const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;










//! Middleware......
app.use(cors());
app.use(express.json());



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y0hhy5e.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
// const client = new MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true,serverApi: ServerApiVersion.v1,});





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y0hhy5e.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






async function run() {



	//todo = = = = = = ALL Data Collections = = = = = = = = = = =
	
	// User Collection
	const usersCollection = client.db('Social-Media').collection('users');
	
	// Added Products Collection
	const addedCollection = client.db('Social-Media').collection('addedStatus');
    



    //! < Start >  get status ======>
	app.get('/status', async (req, res) => {
		const status = {};
		const result = await addedCollection.find(status).toArray();
		console.log(result)
		res.send(result);
	});

	//!======END======>








    //! < Start >  add a new status ======>
	app.post('/status', async (req, res) => {
		const status = req.body;
		console.log(status);
		console.log(status);
		const result = await addedCollection.insertOne(status);
		console.log(result)
		res.send(result);
	});

	//!======END======>






}
run().catch(console.log);




app.get('/', (req, res) => {
    res.send('News Feed Server is running')
});

app.listen(port, () => {console.log(`Server running on port ${port}`);})