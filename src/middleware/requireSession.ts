import type {Request,Response,NextFunction} from "express"
import { descopeClient } from "../config/descope.js";

export type AuthContext = {
    authUserId:string;
    email?:string;
    name?:string;
    userId?:string;
    token:Record<string,unknown>
}


declare global{
    namespace Express{
        interface Request{
            auth?:AuthContext
        }
    }
}

export async function requireSession (
    req:Request,
    res:Response,
    next:NextFunction
){
    const header = req.headers.authorization
    const token = header?.startsWith("Bearer ")? header.slice("Bearer ".length).trim():""
    if(token.length===0)
    {
        res.status(401).json({error:"Unauthorised", sucess:false})
        return
    }
    try{
        const authInfo = await descopeClient.validateSession(token);
        const claims = authInfo.token as Record<string,unknown>
        const authUserId = String(claims.sub?? "")
        if(!authInfo){
             res.status(401).json({error:"Unauthorised", sucess:false})
        return
        }
        const email = typeof claims.email ==="string"?claims.email:undefined

        //user

        

    }
    catch(error)
    {

    }
}