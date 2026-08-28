import { CALENDER_CONNECTION_ID, CALENDER_CONNECTION_LABEL, descopeClient } from "../config/descope.js";
import { getCalendarConnectionRow, upsertCalendarConnection } from "../repositories/connection.repositories.js";
import { Response } from 'express';

function calenderAppId(){
    if(!CALENDER_CONNECTION_ID)
    {
        throw new Error("Calender Connection is not present in env")
    }
    return CALENDER_CONNECTION_ID

}
export async function getCalenderConnection(userId:string){
    const row = await getCalendarConnectionRow(userId);
    return{
        label:CALENDER_CONNECTION_LABEL,
        status:row?.status ??("disconnected")
    }
}

export async function createCalendarConnectionUrl(
    input:{userId:string,
    refreshToken:string,
    redirectUrl:string}
){
    const response = await descopeClient.outbound.connect(
        calenderAppId(),{
            redirectUrl:input.redirectUrl},
            input.refreshToken
    )
    if(!response.ok)
    {throw new Error("Could not start connection")}
    await upsertCalendarConnection({userId:input.userId, status:'pending'})
    return {url:response.data!.url||""};
}

export async function refreshCalenderConnection(input:
    {
        userId:string, authUserid:string}){
            if(process.env.DESCOPE_MANAGEMENT_KEY)
            {
                throw new Error ("Descope key is not SET in the env file")
            }
const response = await descopeClient.management.outboundApplication.fetchToken(calenderAppId(), input.authUserid)
const status = response.ok && response.data ? "connected" : "disconnected"
const row = await upsertCalendarConnection({
    userId:input.userId,
    status
})
return {
    label : CALENDER_CONNECTION_LABEL,
    status:row.status
}
}