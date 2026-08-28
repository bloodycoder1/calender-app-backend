import "dotenv/config"
import cors from "cors"
import express from "express"
import {getPool} from "./db/pool.js"
import { connectionRouter } from "./routes/connection.routes.js";
const app = express();
const port = Number(process.env.PORT)||4000
const appOrigin = process.env.APP_URL ?? "http://localhost:3000" 

app.use(
    cors({origin:appOrigin,
        credentials:true
    })
)

app.use(express.json());

app.get("/health",async(req,res)=>{
    try
    {
    await getPool().query("SELECT 1")
        res.json({
            status:"ok",
            service:"agentic-calender-app",
            database:"up"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            sucess:false,
            err:err,
            message:"Internal Server Error"
        })
    }
})
app.use("/api/connections", connectionRouter)
app.listen(port,()=>{
    console.log("We are running at the ", port);
    
})