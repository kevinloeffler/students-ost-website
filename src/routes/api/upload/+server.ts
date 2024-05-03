import crypto from "crypto";
import {fail, json, type RequestHandler} from '@sveltejs/kit'
import fs from 'fs/promises'
import {readJWT} from '$lib/auth.server.js'

export const POST: RequestHandler = async ({request, cookies}): Promise<Response> => {

    // validate that user is allowed to delete the ressource
    try {
        const accessToken = readJWT(cookies.get('jwt'))
    } catch (error) {
        return json({success: false, reason: 'user is unauthorized to create this ressource'})
    }

    const body = await request.formData();
    const file = body.get('file') as Optional<File>

    const dir = body.get('dir') as string

    if (!file || !dir) {
        // could return placeholder image here instead of error
        throw fail(400, {'status': false, 'reason': 'missing file or dir value in request body'})
    }

    const newFileName = crypto.randomUUID() + '.' + file.name.split('.').pop()

    const filePath = `public/uploads/${dir}/${newFileName}`
    const buffer = await file.arrayBuffer()
    const bufferView = new Uint8Array(buffer)
    await fs.writeFile(filePath, bufferView)

    return json({'status': true, 'url': `/uploads/${dir}/${newFileName}`})
}

export const DELETE: RequestHandler = async ({request, cookies}): Promise<Response> => {

    // validate that user is allowed to delete the ressource
    try {
        const accessToken = readJWT(cookies.get('jwt'))
        // TODO: implement further validation, issue #7
    } catch (error) {
        return json({success: false, reason: 'user is unauthorized to delete this ressource'})
    }

    const body = await request.json()
    await fs.unlink(`public/${body.path}`)
    return json({'status': true})
}
