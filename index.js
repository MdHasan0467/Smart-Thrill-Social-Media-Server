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



	//FIXME:
	//todo = = = = = = ALL Data Collections = = = = = = = = = = =
	
	// User Collection
	const usersCollection = client.db('Smart-Thrill').collection('Users');
	
	// Added Products Collection
	const addedCollection = client.db('Smart-Thrill').collection('Posts');
    
	// Added Products Collection
	const addedAdCollection = client.db('Smart-Thrill').collection('Advertise');
    
    
	// Added Chat Collection
	const addedChatCollection = client.db('Smart-Thrill').collection('Chat');
    







	//FIXME:
	//todo = = = = = = ALL get APIs = = = = = = = = = = =
	
	
	
    //! < Start >  get admin ======>
	app.get('/admin', async (req, res) => {
		const query = {role : 'admin'};
		const result = await usersCollection.findOne(query);
		res.send(result)
	})

	//!======END======>






    //! < Start >  get Reels ======>
	app.get('/reels', async (req, res) => {
		const query = { category: "reels" };
		const result = await (await addedCollection.find(query).toArray()).reverse();
		res.send(result)
	})

	//!======END======>







    // //! < Start >  get All Data by pagination ======>
	// app.get('/allData', async (req, res) => {
	// 	const page = parseInt(req.query.page);
	// 	const dataSize = parseInt(req.query.dataSize);
	// 	const query = {};
	// 	const result = await (await addedCollection.find(query).skip(page*dataSize).limit(dataSize).toArray());
	// 	const count = await addedCollection.estimatedDocumentCount();
	// 	 //TODO: koto gulo data ase seita count korar jonno...
	// 	res.send({ count, result })
	// })

	// //!======END======>






    //! < Start >  get All Data ======>
	app.get('/allData', async (req, res) => {
		const query = {};
		const result = await addedCollection.find(query).toArray();
		res.send(result)
	})

	//!======END======>
















    //! < Start >  get all Data ======>
	app.get('/status', async (req, res) => {
		const page = parseInt(req.query.page);
		const dataSize = parseInt(req.query.dataSize);
		const query = {};
		const result = await (await addedCollection.find(query).skip(page*dataSize).limit(dataSize).toArray());
		const count = await addedCollection.estimatedDocumentCount();
		//TODO: koto gulo data ase seita count korar jonno...
		res.send({ count, result })
	})

	//!======END======>







    //! < Start >  get ads ======>
	app.get('/ad-center', async (req, res) => {
		const query = {};
		const result = await addedAdCollection.find(query).toArray();
		res.send(result)
	})

	//!======END======>








    //! < Start >  get all user ======>
	app.get('/my-friends', async (req, res) => {
		const query = {};
		const result = await usersCollection.find(query).toArray();
		res.send(result)
	})

	//!======END======>








    //! < Start >  get last updated photos by specific email ======>
	app.get('/photos/:email', async (req, res) => {
		const email = req.params.email;
		const query = { authorEmail: email, category: "photos" }; 
		
		//TODO: first query {authorEmail: email} is for finding user
		//TODO: And second query {category:"photos"} is for finding category
		
		const result = await addedCollection.find(query).toArray();
		res.send(result)
	})

	//!======END======>








    //! < Start >  get last updated status by specific email ======>
	app.get('/status/:email', async (req, res) => {
		const email = req.params.email;
		const query = { authorEmail: email, category: "status" }; 
		
		//TODO: first query {authorEmail: email} is for finding user
		//TODO: And second query {category:"status"} is for finding category
		
		const result = await addedCollection.find(query).toArray();
		res.send(result)
	})

	//!======END======>








    //! < Start >  get last updated feelings by specific email ======>
	app.get('/feelings/:email', async (req, res) => {
		const email = req.params.email;
		const query = { authorEmail: email, category: "feelings" }; 
		
		//TODO: first query {authorEmail: email} is for finding user
		//TODO: And second query {category:"feelings"} is for finding category
		
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
	
	
	
	
	
	
	
	

	
	
	
	
	
	//!======START <- get message by receiver email ======>
	app.get('/chat/:email', async (req, res) => {
		const email = req.params.email;
		// console.log(req.params)
		const user = { receiverEmail: email };
		const result = await (await addedChatCollection.find(user).toArray()).reverse();
		res.send(result)
	});
		
		// !======END======>
	
	
	
	
	
	//!======START <- get user for AuthContext by user email ======>
	app.get('/dynamic/:email', async (req, res) => {
		const email = req.params.email;
		const user = { email: email };
		const result = await usersCollection.findOne(user);
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
	
	
	
	
	


	 //FIXME:
	 //todo = = = = = = ALL post APIs = = = = = = = = = = =




    //! < Start >  add a new user ======>
	app.post('/users', async (req, res) => {
		const user = req.body;
		const email = user.email
		const filter = await usersCollection.findOne({ email: email });
		if (filter === null) {
			const result = await usersCollection.insertOne(user);
		     res.send(result);
		}
		else {
			res.status(400).json({ errors: [{ msg: "User already exists" }] });
		}

		//TODO: Jodi user already data base a store thake taholy 400 message ta dekhabe.... R jodi user already data base a store na thake taholy data ta insert hobe.
		
	});

	//!======END======>







    //! < Start >  add a new status ======>
	app.post('/status', async (req, res) => {
		const status = req.body;
		const result = await addedCollection.insertOne(status);
		res.send(result);
	});

	//!======END======>






    //! < Start >  add a new status ======>
	app.post('/reels', async (req, res) => {
		const reel = req.body;
		const result = await addedCollection.insertOne(reel);
		res.send(result);
	});

	//!======END======>







    //! < Start >  add a new status ======>
	app.post('/message', async (req, res) => {
		const message = req.body;
		const result = await addedChatCollection.insertOne(message);
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











	     //FIXME:
		//todo = = = = = = ALL Delete APIs = = = = = = = = = = =
	
	    //! < Start >  Delete status ======>
		app.delete('/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await addedCollection.deleteOne(query);
			res.send(result);
		});
	
		//!======END======>
	
	
	
	
	
	
	
	
	    //FIXME:
		//todo = = = = = = ALL Update APIs = = = = = = = = = 
	
		//! update an like by clicking home page like button using it's ID
		
		app.put('/like/:id', async (req, res) => {
			const id = req.params.id;
			const filter = { _id: ObjectId(id) };
			const data = req.body;
			// console.log('filter', filter);
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
			// console.log(result);
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
			
			res.send(result);
	
		})
	
	
	
	
	
	
	
		//! Update User Social Medial in profile page using it's ID
		
		app.put('/update-social-media/:email', async (req, res) => {
			const email = req.params.email;
			const user = { email: email };
			const data = req.body;
			const option = { upsert: true };
			const updatedData = {
				$set: {
					
					facebookURL : data.facebookURL,
					githubURL : data.githubURL,
					linkedinURL : data.linkedinURL,
					twitterURL : data.twitterURL,
				}
			}
			const result = await usersCollection.updateOne(user, updatedData, option );
			
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
			
			res.send(result);
	
		})
	
	
	
	
	
	
	
		//! update User profile photo in profile page  using user email
		
		app.put('/update-profile/:email', async (req, res) => {
			const email = req.params.email;
			const user = { email: email };
			const data = req.body;
			// console.log('first')
			const option = { upsert: true };
			const updatedData = {
				$set: {
                    image: data.image
				}
			}
			const result = await usersCollection.updateOne(user, updatedData, option );
			
			res.send(result);
	
		})
	
	
	
	
	
	
	
		//! update User profile photo in profile page  using user email
		
		app.put('/update-authorProfile/:email', async (req, res) => {
			const email = req.params.email;
			const user = { authorEmail: email };
			const data = req.body;
			
			const option = { upsert: true };
			const updatedData = {
				$set: {
                    authorImage: data.image
				}
			}
			const result = await addedCollection.updateMany(user, updatedData, option );
			
			res.send(result);
			console.log(result)
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
			
			res.send(result);
	
		})
	
	
	
	
	
	
	

  }
  run().catch(console.log);
//! ===================< THE END >===================
//! ===================< *** *** >===================



app.get('/', (req, res) => {
    res.send('Smart Thrill Server is running')
});

app.listen(port, () => {console.log(`Smart Thrill Server is running on port ${port}`);})