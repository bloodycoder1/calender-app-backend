import { CALENDER_CONNECTION_ID, CALENDER_CONNECTION_LABEL, descopeClient } from "../config/descope.js";
import { getCalendarConnectionRow } from "../repositories/connection.repositories.js";

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
}