import crypto from "crypto";
import {fail, json, type RequestHandler} from '@sveltejs/kit'
import fs from 'fs/promises'

export const POST: RequestHandler = async ({request}): Promise<Response> => {
    const body = await request.formData();
    const file = body.get('file') as Optional<File>

    const dir = body.get('dir') as string

    if (!file || !dir) {
        // could return placeholder image here instead of error
        throw fail(400, {'status': false, 'reason': 'missing file or dir value in request body'})
    }

    const newFileName = crypto.randomUUID() + '.' + file.name.split('.').pop()

    const filePath = `static/uploads/${dir}/${newFileName}`  // use public?
    const buffer = await file.arrayBuffer()
    const bufferView = new Uint8Array(buffer)
    await fs.writeFile(filePath, bufferView)

    return json({'status': true, 'url': `/uploads/${dir}/${newFileName}`})
}

export const DELETE: RequestHandler = async ({request}): Promise<Response> => {
    const body = await request.json()
    await fs.unlink(`static/${body.path}`)
    return json({'status': true})
}
