import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    avatar: {type: String, default:""},
    name: { type: String },
    email: { type: String},
    username: {type: String, default:""},
    bio: String,
    location: String,
    revenue: {type: Number, default: null},
    theme: {type: String, default: "light"},
    payment: {type: Boolean, default: false},
    twitter: String,
    instagram: String,
    youtube: String,
    linkedin: String,
    github: String,
    tiktok: String,

});

const UserModel = mongoose.models.Users || mongoose.model('Users', schema);

export default UserModel;
