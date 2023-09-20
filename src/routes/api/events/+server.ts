import {getAllOstEvents} from "$lib/database.server";
import {json} from "@sveltejs/kit";

export async function GET() {
    const ostEvents: OstEvent[] = await getAllOstEvents()
    return json(ostEvents)
}
