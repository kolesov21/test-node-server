import express from 'express';
import cors from 'cors';

import {
    connectToColletion,
    getUsersData,
    addNewUser,
    deleteUser,
    updateUserData,
} from './mongo.js';

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

app.get('/users/get', async (req, res) => {
    try{
        const usersCollection = await connectToColletion();
        const usersData = await getUsersData(usersCollection);
        res.json(usersData);
    }catch(error){
        console.log("Error GET users: " + error);
    }
});

app.post('/users/add', async (req, res) => {
    try{
        const usersCollection = await connectToColletion();
        await addNewUser(usersCollection, req.body);
        res.status(201).send('User added successfully');
    }catch(error){
        console.log("Error ADD user: " + error);
    }
});

app.delete('/users/delete/:id', async (req, res) => {
    try{
        const usersCollection = await connectToColletion();
        await deleteUser(usersCollection, req.params.id);
        res.send('User deleted successfully');
    }catch(error){
        console.log("Error DELETE user: " + error);
    }
});

app.put('/users/update', async (req, res) => {
    try{
        const usersCollection = await connectToColletion();
        const updatedUser = req.body;
        await updateUserData(usersCollection, updatedUser);
        res.status(200).send('User data updated successfully')
    }catch(error){
        console.log("Error UPDATE user: " + error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});