import mongoose from 'mongoose';

const userScrema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

const User = mongoose.model('User',userScrema);


export default User;