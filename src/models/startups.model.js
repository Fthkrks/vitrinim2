import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userRef: { type: mongoose.Types.ObjectId, ref: "Users", unique: true},
  emailRef: String,
  url: String,
  name: { type: String, default: "" },
  desc: { type: String, default: "" },
  logo: { type: String, default: "" },
  active: { type: Boolean, default: true },
  banner: { type: String, default: "" },
  category: { type: String, default: "" },
  order: {type: Number, default: null}
});

const StartupModel =
  mongoose.models.Startups || mongoose.model("Startups", schema);

export default StartupModel;
