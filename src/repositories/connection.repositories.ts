import { getPool } from "../db/pool.js"


export type ConnectionStatus = 'connected' | 'disconnected' | 'pending'

export type CurrentConnectionROW={
    user_id:string,
    provider:'calender',
    status:ConnectionStatus
}

export async function getCalendarConnectionRow(
    userId:string
){
    const result = await getPool().query<CurrentConnectionROW>(`
        SELECT user_id, provider,status
        FROM connections
        WHERE user_id = $1 AND provider = 'calender'
        `,[userId])
        return result.rows[0]?? null
}