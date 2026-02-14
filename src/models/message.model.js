const messageSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

  role: {
    type: String,
    enum: ["user", "assistant"]
  },

  content: String,
},{timestamps : true});

export default mongoose.model("Message", messageSchema);
