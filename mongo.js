import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://user:MpsY4sgKcsfpGe1y@cluster0.ogc1n2e.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToColletion(){
    try{
        await client.connect();
        const usersCollection = client.db('users').collection('users');
        return usersCollection;
    }
    catch(error){
        console.log(error);
    }
}

async function getUsersData(usersCollection){
    try{
        const usersData = await usersCollection.find().toArray();
        return usersData;
    }
    catch(error){
        console.log(error);
    }
    finally{
        await client.close();
    }
}

async function addNewUser(usersCollection, userObject){
    try{
        await usersCollection.insertOne(userObject);
    }
    catch(error){
        console.log(error);
    }
    finally{
        await client.close();
    }
}

async function deleteUser(usersCollection, userObjectId){
    try{
        await usersCollection.deleteOne({_id: new ObjectId(userObjectId)});
    }
    catch(error){
        console.log(error);
    }
    finally{
        await client.close();
    }
}

async function updateUserData(usersCollection, userObject){
    try{
        await usersCollection.updateOne(
            {_id: new ObjectId(userObject._id)},
            {$set:{
                name: userObject.name,
                phone: userObject.phone,
                email: userObject.email,
                address: userObject.address,
            }}
        )
    }
    catch(error){
        console.log(error);
    }
    finally{
        await client.close();
    }
}

export {
    connectToColletion,
    getUsersData,
    addNewUser,
    deleteUser,
    updateUserData
};