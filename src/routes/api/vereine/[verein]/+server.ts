import { json } from '@sveltejs/kit';
import { getVerein } from '$lib/database.server.js'

export async function GET({ params }: any): Promise<Response> {
    const verein = await getVerein(params.verein)
    return json(verein)
}
