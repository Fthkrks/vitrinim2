import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    avatar: {type: String, default:""},
    name: { type: String },
    email: { type: String},
    username: String,
    bio: {type: String, default: ""},
    location: {type: String, default: ""},
    revenue: {type: Number, default: null},
    theme: {type: String, default: "light"}
});

const UserModel = mongoose.models.Users || mongoose.model('Users', schema);

export default UserModel;
