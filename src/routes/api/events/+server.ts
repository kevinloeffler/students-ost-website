import crypto from "crypto";
import * as fs from 'fs/promises'
import type { RequestHandler } from '@sveltejs/kit';
import {createOstEvent, getAllOstEvents, getUserByUsername} from "$lib/database.server";
import {json} from "@sveltejs/kit";
import { readJWT } from '$lib/auth.server';

export async function GET() {
    const ostEvents: OstEvent[] = await getAllOstEvents()
    return json(ostEvents)
}

export const POST: RequestHandler = async ({ params , cookies, request}): Promise<Response> => {
    const payload = await request.json()
    const ostEvent: OstEvent = payload.ostEvent

    const fileObject: FileObject = payload.file
    const fileData = fileObject.data as {[key: string]: number}
    const length = Object.keys(fileData).length
    const fileArray = new Uint8Array(length)
    for (let index = 0; index < length; index++) {
        fileArray[index] = fileData[`${index}`]
    }

    const fileName = crypto.randomUUID() + '.' + fileObject.suffix
    const path = `static/images/user_uploaded/events/${fileName}`
    await fs.writeFile(path, fileArray)

    ostEvent.mainImage = '/images/user_uploaded/events/' + fileName

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
    const response = await createOstEvent(ostEvent)
    console.log('response:', response)

    // TODO: handle error case
    return json({status: true, ostEvent: response})
}
