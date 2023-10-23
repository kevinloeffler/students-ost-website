import { json } from '@sveltejs/kit';
import { getAllOrganisations } from '$lib/database.server.js'

export async function GET({url}: any) {
    const type = url.searchParams.get('type')
    const organisation: Organisation[] = await getAllOrganisations(type)
    return json(organisation)
}
