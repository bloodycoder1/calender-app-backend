import {Router} from "express"
import { requireSession } from "../middleware/requireSession.js";
import { createCalendarConnectionUrl, getCalenderConnection, refreshCalenderConnection } from "../service/connection.service.js";

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
            userId:(req.auth!.userId as string),
            refreshToken,
            redirectUrl
        }) 
        res.json(result)
    }
    catch(error){

    }
})

connectionRouter.post("/refresh-status",async(req,res)=>{
    try{
        const connection = await refreshCalenderConnection(
            {
                userId:(req.auth?.userId as string),
                authUserid:(req.auth?.authUserId as string)
            }
        )
        res.json({connection})
    }
    catch(error)
    {
        res.status(500).json({error:"Failed to Refresh the Status"})
    }
})