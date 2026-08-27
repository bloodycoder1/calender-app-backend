import {Router} from "express"
import { requireSession } from "../middleware/requireSession.js";
import { createCalendarConnectionUrl, getCalenderConnection } from "../service/connection.service.js";

export const connectionRouter = Router();

// Inset of using this middle ware on the all of the routes we are using it as the middleware so all the routes in the folder will require the session


connectionRouter.use(requireSession)
connectionRouter.get("/",async(req,res)=>{
    try{
        const connection = await getCalenderConnection((req.auth?.userId as string))
        res.json({connection})
    }
    catch(error)
    {
        res.status(500).json({error:"could not load connections"})
    }
})

connectionRouter.post("/connect",async (req,res)=>{
    try{
        const refreshToken = typeof req.body?.refreshToken ==="string"?req.body.refreshToken:"";
        if(!refreshToken)
        {
            res.status(400).json({
                error:"Refresh Token is Required"
            })
        }
        const redirectUrl = typeof req.body?.redirectUrl ==="string"? req.body.redirectUrl:`${process.env.APP_URL}/dashboard`
        const result = await createCalendarConnectionUrl({
            userId:req.auth!.userId,
            refreshToken,
            redirectUrl
        }) 
        res.json(result)
    }
    catch(error){

    }
})