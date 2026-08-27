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