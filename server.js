import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.port || 3000;

import {
    connectToColletion,
    getUsersData,
    addNewUser,
    deleteUser,
    updateUserData,
} from './mongo.js';

app.use(cors());
app.use(express.json());

app.get('https://test-node-server-be1d.onrender.com/users', async (req, res) => {
    const usersCollection = await connectToColletion();
    const usersData = await getUsersData(usersCollection);
    res.json(usersData);
});

app.post('https://test-node-server-be1d.onrender.com/users/add', async(req, res) =>{
    const usersCollection = await connectToColletion();
    await addNewUser(usersCollection, req.body);
    res.status(201).send('User added successfully');
});

app.delete('https://test-node-server-be1d.onrender.com/users/:id', async (req, res) => {
    const usersCollection = await connectToColletion();
    await deleteUser(usersCollection, req.params.id);
    res.send('User deleted successfully');
});

app.put('https://test-node-server-be1d.onrender.com/users/update', async(req, res) => {
    const usersCollection = await connectToColletion();
    const updatedUser = req.body;

    await updateUserData(usersCollection, updatedUser);
    res.status(200).send('User data updated successfully')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});