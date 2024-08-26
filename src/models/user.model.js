import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String},
    username: String,
});

const UserModel = mongoose.models.Users || mongoose.model('Users', schema);

export default UserModel;
