import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    avatar: {type: String, default:""},
    name: { type: String },
    packetType:{type: String},
    expirationDate: {type: Date, default: null},
    email: { type: String, unique: true},
    username: {type: String, default:"", unique: true},
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
