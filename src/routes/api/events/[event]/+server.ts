import type { RequestHandler } from '@sveltejs/kit';
import {getOstEvent, getUserByUsername, insertOrUpdateOstEvent} from "$lib/database.server";
import {json} from "@sveltejs/kit";
import {readJWT} from "$lib/auth.server";

export async function GET({ params }: any): Promise<Response> {
    const ostEvent = await getOstEvent(params.event)
    return json(ostEvent)
}

export const POST: RequestHandler = async ({ params , cookies, request}): Promise<Response> => {
    const ostEvent: OstEvent = await request.json() // TODO: get event

    // validate that user is allowed to change this event
    try {
        const accessToken = readJWT(cookies.get('jwt'))
        const user = await getUserByUsername(accessToken.username)
        if (user.organisation !== ostEvent.organiserId) {throw new Error('unauthorized')}
    } catch (error) {
        console.log(error)
        return json({success: false, reason: 'user is unauthorized to modify this event'})
    }

    // TODO: check that the organisation id is the same
    const response = await insertOrUpdateOstEvent(ostEvent)
    console.log('response:', response)

    return json({status: response.acknowledged})
}

