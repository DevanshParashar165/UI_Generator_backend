import express from "express"
import cors from "cors"
import "dotenv/config";
import { connectDB } from "./src/db/index.js";
import http from "http"
import userRoute from "./src/routes/auth.route.js";
import aiRoute from "./src/routes/ai.route.js";
import cookieParser from "cookie-parser";
import projectRoute from "./src/routes/project.route.js";
import messageRoute from "./src/routes/message.route.js";
import generationRoute from "./src/routes/generation.route.js";

const app = express();
const server = http.createServer(app);


// Middleware

app.use(express.json({
    limit : '16kb'
}))
app.use(cors({
    origin : '*',
    credentials : true
}))
app.use(cookieParser())

// Database connection

await connectDB();

//Routes

app.use('/api/v1/auth',userRoute)
app.use("/api/v1/ai", aiRoute);
app.use("/api/v1/projects",projectRoute)
app.use("/api/v1/messages",messageRoute)
app.use("/api/v1/generations",generationRoute)



app.get('/',(req,res)=>{
  try {
    return res.status(200)
              .json({
                message : "Server working perfectly"
              })
  } catch (error) {
    console.log(error)
    return res.status(400)
              .json({message : error})
  }
})

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
}

export default server
