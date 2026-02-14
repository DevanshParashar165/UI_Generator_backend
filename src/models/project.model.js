import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    default: "Untitled Project",
    maxLength : [50,"Only 50 chracters allowed for project title"]
  },
  currentVersion: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
    timestamps : true
});

export default mongoose.model("Project", projectSchema);
