import type { RequestHandler } from '@sveltejs/kit';
import {deleteOstEvent, getOstEvent, getUserByUsername, insertOrUpdateOstEvent} from "$lib/database.server";
import {json} from "@sveltejs/kit";
import {readJWT} from "$lib/auth.server";
import {saveImageToDisk} from "$lib/util.server";

export async function GET({ params }: any): Promise<Response> {
    const ostEvent = await getOstEvent(params.event)
    return json(ostEvent)
}

export const POST: RequestHandler = async ({ params , cookies, request}): Promise<Response> => {
    const payload = await request.json()
    const ostEvent: OstEvent = payload.ostEvent

    // validate that user is allowed to change this event
    try {
        const accessToken = readJWT(cookies.get('jwt'))
        const user = await getUserByUsername(accessToken.username)
        const oldOstEvent = await getOstEvent(ostEvent.name)
        if (ostEvent.organiserId !== oldOstEvent?.organiserId)  throw new Error('unauthorized')
        if (user.organisation !== ostEvent.organiserId) throw new Error('unauthorized')
    } catch (error) {
        console.log(error)
        return json({success: false, reason: 'user is unauthorized to modify this event'})
    }

    ostEvent.mainImage = await saveImageToDisk(payload.file)

    const response = await insertOrUpdateOstEvent(ostEvent)

    return json({status: response.acknowledged})
}

export const DELETE: RequestHandler = async ({params, cookies}): Promise<Response> => {
    // const id = await request.json()
    const id = params.event as string

    try {
        const accessToken = readJWT(cookies.get('jwt'))
        const user = await getUserByUsername(accessToken.username)
        const ostEvent = await getOstEvent(id)
        if (user.organisation !== ostEvent?.organiserId) throw new Error('unauthorized')
    } catch (error) {
        console.error(error)
        return json({success: false, reason: 'user is unauthorized to modify this event'})
    }

    const response = await deleteOstEvent(id)
    console.log(response)
    return json({status: response.acknowledged, deleteCount: response.deleteCount})
}
