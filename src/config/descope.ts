import DescopeClient from "@descope/node-sdk"
const projectID = process.env.DESCOPE_PROJECT_ID
const managementID=process.env.DESCOPE_MANAGEMENT_KEY
if(!projectID)
{
    console.warn("Descope project ID is not SET")
}

export const descopeClient = DescopeClient({projectId:projectID??"",
    managementKey:managementID ?? ""

})
export const CALENDER_CONNECTION_ID = process.env.DESCOPE_GOOGLE_CALENDER_ID || "google-calender"
export const CALENDER_CONNECTION_LABEL = "Google Calender"