const generationSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  versionNumber: Number,
  plan: String,
  code: String,
  explanation: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Generation", generationSchema);
