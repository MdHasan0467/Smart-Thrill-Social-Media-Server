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
    
	// Added Products Collection
	const addedLikeCollection = client.db('Social-Media').collection('addedLike');
    







		//todo = = = = = = ALL get APIs = = = = = = = = = = =
	
	
	

    //! < Start >  get status ======>
	app.get('/status', async (req, res) => {
		const query = {};
		const result = await addedCollection.find(query).toArray();
		res.send(result)
	})

	//!======END======>








    //! < Start >  get photos ======>
	app.get('/photos/:email', async (req, res) => {
		const email = req.params.email;
		const query = { authorEmail: email };
		
		// const options = {
		// 	sort: { category: 'photos' }
		// }
		const result = await addedCollection.find(query).toArray();
		// console.log(result)
		res.send(result)
	})

	//!======END======>









		//!======START <- get user posted data  by user email ======>
		app.get('/data/:email', async (req, res) => {
			const email = req.params.email;
			const data = { authorEmail: email };
		    const result = await addedCollection.find(data).toArray();
			res.send(result);
			
		});

	
	
	
	
	
	
	
	
	
	
	
	
	//!======START <- get user for AuthContext by user email ======>
	app.get('/:email', async (req, res) => {
		const email = req.params.email;
		// console.log('email', email);
		const user = { email: email };
		const result = await usersCollection.findOne(user);
		// console.log('result',result);
		res.send(result)
	});
		
		// !======END======>


		//todo = = = = = = ALL post APIs = = = = = = = = = = =




    //! < Start >  add a new user ======>
	app.post('/users', async (req, res) => {
		const user = req.body;
		const result = await usersCollection.insertOne(user);
		res.send(result);
	});

	//!======END======>







    //! < Start >  add a new status ======>
	app.post('/status', async (req, res) => {
		const status = req.body;
		const result = await addedCollection.insertOne(status);
		res.send(result);
	});

	//!======END======>











			//todo = = = = = = ALL Delete APIs = = = = = = = = = = =
	
	    //! < Start >  Delete status ======>
		app.delete('/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await addedCollection.deleteOne(query);
			res.send(result);
		});
	
		//!======END======>
	
	
	
	
	
			//todo = = = = = = ALL Update APIs = = = = = = = = = 
	
		//! update an ordered data by clicking wish page buy now button using it's ID
		
		app.put('/like/:id', async (req, res) => {
			const id = req.params.id;
			const filter = { _id: ObjectId(id) };
			const data = req.body;
			// console.log(data);
			const option = { upsert: true };
			const updatedData = {
				$set: {
					
					likerName : data.likerName,
					likerEmail : data.likerEmail,
					LikerImage : data.LikerImage,
					likes : data.likes,
				}
			}
			const result = await addedCollection.updateOne(filter, updatedData, option );
			console.log(result);
			res.send(result);
	
			})

}
run().catch(console.log);




app.get('/', (req, res) => {
    res.send('News Feed Server is running')
});

app.listen(port, () => {console.log(`News Feed Server is running on port ${port}`);})