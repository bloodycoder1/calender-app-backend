import {Pool} from "pg"

let pool : Pool | null = null;
export function getPool():Pool{
    
    if(!pool){
        const connectionString = process.env.DATABSE_URL
        if(!connectionString)
            {
                throw new Error("DATABASE_URL is not present")
            }
            pool = new Pool({connectionString})
        }
        // console.log("=======================||===========================");
    return pool
}


export async function closePool():Promise<void>{
    if(pool)
    {
        await pool.end()
        pool = null;
    }
}