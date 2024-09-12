import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    userRef: {type: mongoose.Types.ObjectId, ref:"Users"},
    startupRef: {type: mongoose.Types.ObjectId, ref: "Startups"},
    name: String,
    month: {type: String},
    totalClick: {type:Number, default: 1}
})

const StartupsClicks = mongoose.models.StartupsClicks || mongoose.model("StartupsClicks", schema);

export default StartupsClicks;