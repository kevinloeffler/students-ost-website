import type { RequestHandler } from '@sveltejs/kit';
import {createOstEvent, getAllOstEvents, getUserByUsername} from "$lib/database.server";
import {json} from "@sveltejs/kit";
import { readJWT } from '$lib/auth.server';

export async function GET() {
    const ostEvents: OstEvent[] = await getAllOstEvents()
    return json(ostEvents)
}

export const POST: RequestHandler = async ({ cookies, request}): Promise<Response> => {
    const ostEvent = await request.json()

    // validate that user is allowed to change this event
    try {
        const accessToken = readJWT(cookies.get('jwt'))
        const user = await getUserByUsername(accessToken.username)
        if (user.organisation !== ostEvent.organiserId) {throw new Error('unauthorized')}
    } catch (error) {
        console.log(error)
        return json({success: false, reason: 'user is unauthorized to modify this event'})
    }

    const response = await createOstEvent(ostEvent)

    // TODO: handle error case
    return json({status: true, ostEvent: response})
}
