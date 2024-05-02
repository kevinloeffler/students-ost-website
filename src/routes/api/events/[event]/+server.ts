import type { RequestHandler } from '@sveltejs/kit';
import {deleteOstEvent, getOstEvent, getUserByUsername, insertOrUpdateOstEvent} from "$lib/database.server";
import {json} from "@sveltejs/kit";
import {readJWT} from "$lib/auth.server";

export async function GET({ params }: any): Promise<Response> {
    const ostEvent = await getOstEvent(params.event)
    return json(ostEvent)
}

export const POST: RequestHandler = async ({ cookies, request}): Promise<Response> => {
    const ostEvent = await request.json()

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

    const response = await insertOrUpdateOstEvent(ostEvent)
    return json({status: response.acknowledged})
}

export const DELETE: RequestHandler = async ({params, cookies}): Promise<Response> => {
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
    return json({status: response.acknowledged, deleteCount: response.deleteCount})
}
