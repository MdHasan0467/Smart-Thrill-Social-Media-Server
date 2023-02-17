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
	const usersCollection = client.db('Smart-Thrill').collection('Users');
	
	// Added Products Collection
	const addedCollection = client.db('Smart-Thrill').collection('Posts');
    
	// Added Products Collection
	const addedAdCollection = client.db('Smart-Thrill').collection('Advertise');
    







		//todo = = = = = = ALL get APIs = = = = = = = = = = =
	
	
	

    //! < Start >  get status ======>
	app.get('/status', async (req, res) => {
		const query = {};
		const result = await addedCollection.find(query).toArray();
		// console.log('status',result)
		res.send(result)
	})

	//!======END======>







    //! < Start >  get status ======>
	app.get('/ad-center', async (req, res) => {
		const query = {};
		const result = await addedAdCollection.find(query).toArray();
		res.send(result)
	})

	//!======END======>







    //! < Start >  get status ======>
	app.get('/my-friends', async (req, res) => {
		const query = {};
		const result = await usersCollection.find(query).toArray();
		console.log('friends',result)
		res.send(result)
	})

	//!======END======>








    //! < Start >  get last updated photos by specific email ======>
	app.get('/photos/:email', async (req, res) => {
		const email = req.params.email;
		const query = { authorEmail: email, category: "photos" }; 
		
		//todo FIXME: first query {authorEmail: email} is for finding user
		//todo FIXME: And second query {category:"photos"} is for finding category
		
		const result = await addedCollection.find(query).toArray();
		res.send(result)
	})

	//!======END======>








    //! < Start >  get last updated status by specific email ======>
	app.get('/status/:email', async (req, res) => {
		const email = req.params.email;
		const query = { authorEmail: email, category: "status" }; 
		
		//todo FIXME: first query {authorEmail: email} is for finding user
		//todo FIXME: And second query {category:"status"} is for finding category
		
		const result = await addedCollection.find(query).toArray();
		res.send(result)
	})

	//!======END======>








    //! < Start >  get last updated feelings by specific email ======>
	app.get('/feelings/:email', async (req, res) => {
		const email = req.params.email;
		const query = { authorEmail: email, category: "feelings" }; 
		
		//todo FIXME: first query {authorEmail: email} is for finding user
		//todo FIXME: And second query {category:"feelings"} is for finding category
		
		const result = await addedCollection.find(query).toArray();
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

	
	
	
		app.get('/like/:id', async (req, res) => {
			const id = req.params.id;
			const filter = { _id: ObjectId(id) };
			const result = await addedCollection.findOne(filter);
			res.send(result);
	
			})
	
	
	
	
	
	
	
	
		app.get('/get/:id', async (req, res) => {
			const id = req.params.id;
			const filter = { _id: ObjectId(id) };
			const result = await addedCollection.findOne(filter);
			res.send(result);
	
			})
	
	
	
	
	
	
	
	
	//!======START <- get user for AuthContext by user email ======>
	app.get('/dynamic/:email', async (req, res) => {
		const email = req.params.email;
		const user = { email: email };
		const result = await usersCollection.findOne(user);
		console.log(result)
		res.send(result)
	});
		
		// !======END======>
	
	
	
	
	

	//!======START <- get user for AuthContext by user email ======>
	app.get('/:email', async (req, res) => {
		const email = req.params.email;
		const user = { email: email };
		const result = await usersCollection.findOne(user);
		res.send(result)
	});
		
		// !======END======>
	
	
	
	
	


		//todo = = = = = = ALL post APIs = = = = = = = = = = =




    //! < Start >  add a new user ======>
	app.post('/users', async (req, res) => {
		const user = req.body;
		// console.log(user.email)
		const email = user.email
		const filter = await usersCollection.findOne({ email: email });
		console.log(filter)
		if (filter === null) {
			const result = await usersCollection.insertOne(user);
		     res.send(result);
		}
		else {
			res.status(400).json({ errors: [{ msg: "User already exists" }] });
		}
		
		
	});

	//!======END======>







    //! < Start >  add a new status ======>
	app.post('/status', async (req, res) => {
		const status = req.body;
		const result = await addedCollection.insertOne(status);
		res.send(result);
	});

	//!======END======>








    //! < Start >  add a new Advertise ======>
	app.post('/ad-center', async (req, res) => {
		const query = req.body;
		const result = await addedAdCollection.insertOne(query);
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
	
		//! update an like by clicking home page like button using it's ID
		
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
	
	
	
	
	
	
	
		//! update an post by clicking profile page update button using it's ID
		
		app.put('/description/:id', async (req, res) => {
			const id = req.params.id;
			const filter = { _id: ObjectId(id) };
			const data = req.body;
			const option = { upsert: true };
			const updatedData = {
				$set: {
					
					updaterName : data.updaterName,
					updaterImage : data.updaterImage,
					updaterEmail : data.updaterEmail,
					description : data.description,
				}
			}
			const result = await addedCollection.updateOne(filter, updatedData, option );
			// console.log(result);
			res.send(result);
	
		})
	
	
	
	
	
	
	
		//! update an post by clicking profile page update button using it's ID
		
		app.put('/update-cover-photo/:email', async (req, res) => {
			const email = req.params.email;
			const user = { email: email };
			const data = req.body;
			const option = { upsert: true };
			const updatedData = {
				$set: {
					
					updaterName : data.updaterName,
					updaterImage : data.updaterImage,
					updaterEmail : data.updaterEmail,
					coverPhoto: data.coverPhoto,
				}
			}
			const result = await usersCollection.updateOne(user, updatedData, option );
			console.log(result);
			res.send(result);
	
		})
	
	
	
	
	
	
	
		//! update an post by clicking profile page update button using it's ID
		
		app.put('/update-intro/:email', async (req, res) => {
			const email = req.params.email;
			const user = { email: email };
			const data = req.body;
			const option = { upsert: true };
			const updatedData = {
				$set: {
					
					updaterName : data.updaterName,
					updaterImage : data.updaterImage,
					updaterEmail : data.updaterEmail,
					intro: data.intro,
				}
			}
			const result = await usersCollection.updateOne(user, updatedData, option );
			console.log(result);
			res.send(result);
	
		})
	
	
	
	
	
	
	
		//! update User profile photo in profile page  using user email
		
		app.put('/update-profile/:email', async (req, res) => {
			const email = req.params.email;
			const user = { email: email };
			const data = req.body;
			const option = { upsert: true };
			const updatedData = {
				$set: {
                    image: data.image
				}
			}
			const result = await usersCollection.updateOne(user, updatedData, option );
			console.log(result);
			res.send(result);
	
		})
	
	
	
	
	
	
	
		//! update User name in profile page  using user email
		
		app.put('/update-name/:email', async (req, res) => {
			const email = req.params.email;
			const user = { email: email };
			const data = req.body;
			const option = { upsert: true };
			const updatedData = {
				$set: {
					
					name:data.name,
				}
			}
			const result = await usersCollection.updateOne(user, updatedData, option );
			console.log(result);
			res.send(result);
	
		})
	
	
	
	
	
	
	
		//! update User email in profile page  using user email
		
		app.put('/update-email/:email', async (req, res) => {
			const email = req.params.email;
			const user = { email: email };
			const data = req.body;
			const option = { upsert: true };
			const updatedData = {
				$set: {
					
                    email:data.email,
                    // phoneNumber:data.phoneNumber,
				}
			}
			const result = await usersCollection.updateOne(user, updatedData, option );
			console.log(result);
			res.send(result);
	
		})
	
	
	
	
	
	
	
		//! update User phone number in profile page  using user email
		
		app.put('/update-phoneNumber/:email', async (req, res) => {
			const email = req.params.email;
			const user = { email: email };
			const data = req.body;
			const option = { upsert: true };
			const updatedData = {
				$set: {
					
                    phoneNumber:data.phoneNumber,
				}
			}
			const result = await usersCollection.updateOne(user, updatedData, option );
			console.log(result);
			res.send(result);
	
		})
	
	
	
	
	
	
	

}
run().catch(console.log);




app.get('/', (req, res) => {
    res.send('Smart Thrill Server is running')
});

app.listen(port, () => {console.log(`Smart Thrill Server is running on port ${port}`);})