import { json } from '@sveltejs/kit';
import { getOrganisation } from '$lib/database.server.js'

export async function GET({ params }: any): Promise<Response> {
    const organisations = await getOrganisation(params.organisation)
    return json(organisations)
}
