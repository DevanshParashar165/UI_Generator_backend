import express from "express"
import cors from "cors"
import "dotenv/config";
import { connectDB } from "./src/db/index.js";
import http from "http"
import userRoute from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";

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
