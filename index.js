const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;










//! Middleware......
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y0hhy5e.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1,});












async function run() {



	//todo = = = = = = ALL Data Collections = = = = = = = = = = =
	
	// User Collection
	const usersCollection = client.db('Social-Media').collection('users');
	
	// Added Products Collection
	const addedCollection = client.db('Social-Media').collection('addedStatus');
    







		//todo = = = = = = ALL get APIs = = = = = = = = = = =
	
	
	

    //! < Start >  get status ======>
	app.get('/status', async (req, res) => {
		const status = {};
		const result = await addedCollection.find(status).toArray();
		
		res.send(result);
	});

	//!======END======>












		//todo = = = = = = ALL post APIs = = = = = = = = = = =





    //! < Start >  add a new status ======>
	app.post('/status', async (req, res) => {
		const status = req.body;
		const result = await addedCollection.insertOne(status);
		res.send(result);
	});

	//!======END======>




    //! < Start >  add a new user ======>
	app.post('/users', async (req, res) => {
		const user = req.body;
		const result = await usersCollection.insertOne(user);
		res.send(result);
	});

	//!======END======>








			//todo = = = = = = ALL post APIs = = = = = = = = = = =
	
	    //! < Start >  Delete status ======>
		app.delete('/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await addedCollection.deleteOne(query);
			res.send(result);
		});
	
		//!======END======>
	
	
	
	
	
	

}
run().catch(console.log);




app.get('/', (req, res) => {
    res.send('News Feed Server is running')
});

app.listen(port, () => {console.log(`News Feed Server is running on port ${port}`);})