import { json } from '@sveltejs/kit';
import { getAllVereine } from '$lib/database.server.js'

export async function GET() {
    const vereine: Verein[] = await getAllVereine()
    return json(vereine)
}
