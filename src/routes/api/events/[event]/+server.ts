import {fail, type RequestHandler} from '@sveltejs/kit'
import {deleteOstEvent, getOstEvent, getUserByUsername, insertOrUpdateOstEvent} from "$lib/database.server";
import {json} from "@sveltejs/kit";
import {readJWT} from "$lib/auth.server";
import fs from 'fs/promises'

export async function GET({ params }: any): Promise<Response> {
    const ostEvent = await getOstEvent(params.event)

    if (!ostEvent) {
        throw fail(404)
    }

    return json(ostEvent)
}

export const POST: RequestHandler = async ({ cookies, request}): Promise<Response> => {
    const ostEvent = await request.json()

    // validate that user is allowed to change this event
    try {
        await checkAuth(cookies, ostEvent.organiserId)
    } catch (error) {
        console.log(error)
        return json({success: false, reason: 'user is unauthorized to modify this event'})
    }

    const response = await insertOrUpdateOstEvent(ostEvent)
    return json({status: response.acknowledged})
}

export const DELETE: RequestHandler = async ({params, cookies}): Promise<Response> => {
    const id = params.event as string
    const ostEvent = await getOstEvent(id)

    try {
        await checkAuth(cookies, ostEvent?.organiserId)
    } catch (error) {
        console.error(error)
        return json({success: false, reason: 'user is unauthorized to modify this event'})
    }

    // delete image if there is one
    if (ostEvent?.mainImage) { await fs.unlink(`public/${ostEvent.mainImage}`) }

    const response = await deleteOstEvent(id)
    return json({status: response.acknowledged, deleteCount: response.deleteCount})
}

async function checkAuth(cookies: any, organiserId?: string) {
    const accessToken = readJWT(cookies.get('jwt'))
    const user = await getUserByUsername(accessToken.username)
    if (!organiserId || user.organisation !== organiserId) {
        throw new Error('unauthorized')
    }
    return user
}
