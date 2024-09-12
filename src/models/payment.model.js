import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userRef: { type: mongoose.Types.ObjectId, ref: "Users"},
    email: String,
    holderName: String,
    price: String,
});

const PaymnetModel = mongoose.models.Payment || mongoose.model("Payment", schema);
export default PaymnetModel;