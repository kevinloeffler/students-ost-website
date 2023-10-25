import { json, type RequestHandler } from '@sveltejs/kit';
import {
    getAllOrganisations,
    getOrganisation,
    getOstEvent,
    getUserByUsername,
    updateOrganisation
} from '$lib/database.server.js'
import {readJWT} from "$lib/auth.server";
import {saveImageToDisk} from "$lib/util.server";

export async function GET({url}: any) {
    const type = url.searchParams.get('type')
    const organisation: Organisation[] = await getAllOrganisations(type)
    return json(organisation)
}


export const POST: RequestHandler = async ({request, cookies}) => {
    const payload: {organisation: Organisation, file: any } = await request.json()
    const newOrganisation: Organisation = payload.organisation
    const fileObject: Optional<FileObject> = payload.file

    // validate that user is allowed to change organisation
    try {
        const accessToken = readJWT(cookies.get('jwt'))
        const user = await getUserByUsername(accessToken.username)
        const oldOrganisation = await getOrganisation(newOrganisation._id || '')
        if (newOrganisation._id !== oldOrganisation?._id?.toHexString() || newOrganisation._id !== user.organisation) {
            throw new Error('unauthorized')
        }
    } catch (error) {
        console.log(error)
        return json({success: false, reason: 'user is unauthorized to modify this event'})
    }

    newOrganisation.logo = fileObject ? await saveImageToDisk(fileObject, 'logos') : newOrganisation.logo

    const response = await updateOrganisation(newOrganisation)

    return json({status: response.acknowledged})
}
