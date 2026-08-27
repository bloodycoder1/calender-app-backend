import {config} from "dotenv"
import { readdirSync, readFileSync } from "node:fs"
import {resolve} from "node:path"
import { closePool, getPool } from './../src/db/pool';

config({path:resolve(process.cwd(),".env")})

async function main(){
    const sqlDir= resolve(process.cwd(),"src/sql")
    // console.log("this is the sql DIR " , sqlDir);
    
    const files = readdirSync(sqlDir).filter((name, i ,arr)=>{
        // if(i ==0)
        // console.log(arr);
        
        return name.endsWith(".sql")
    }).sort();
    const pool = getPool()
    console.log(files);
    
    for(const file of files)
    {
        const sql = readFileSync(resolve(sqlDir,file),"utf-8")
        // console.log("=================We are reading the FILE====================");
        
         await pool.query(sql)
         console.log(`Migrated : sql/${file}`);
    }
    await closePool()
}

main().catch(err=>{
console.error(err);
process.exit(1)

})