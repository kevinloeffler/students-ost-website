import type {RequestHandler} from "@sveltejs/kit";
import {json} from "@sveltejs/kit";
import {readJWT} from "$lib/auth.server";
import {getOstEvent, getOstEventsByOrganiser, getVerein} from "$lib/database.server";

export const GET: RequestHandler = ( async ({cookies}) => {
    const jwtCookie = cookies.get('jwt')
    if (jwtCookie === undefined) {
        console.log('no jwt found')
        return new Response(JSON.stringify({'body': '401 - Unauthorized'}), {status: 401})
    }

    let accessToken
    try {
        accessToken = readJWT(jwtCookie)
        console.log('JWT:', accessToken)
    } catch (error) {
        console.error('Can not read JWT: re-authentication is required')
        console.error(error)
        return new Response(JSON.stringify({'body': '401 - Unauthorized'}), {status: 401})
    }

    // TODO: get dashboard data
    const organisation = await getVerein(accessToken.vereinID || '')
    const orgEvents = await getOstEventsByOrganiser(accessToken.vereinID || '')

    const dashboard: DashboardData = {
        org: organisation,
        orgEvents: orgEvents,
    }

    return json(dashboard)
})


type DashboardData = {
    org: Verein,
    orgEvents: OstEvent[],
}
