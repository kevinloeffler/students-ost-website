import {getOstEvent} from "$lib/database.server";
import {json} from "@sveltejs/kit";

export async function GET({ params }: any): Promise<Response> {
    const ostEvent = await getOstEvent(params.event)
    return json(ostEvent)
}
