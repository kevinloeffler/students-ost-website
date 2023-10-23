import { json } from '@sveltejs/kit';
import { getAllOrganisations } from '$lib/database.server.js'

export async function GET() {
    const organisation: Organisation[] = await getAllOrganisations()
    return json(organisation)
}
