import type { PageLoad } from './$types'

export const load: PageLoad = ( async ({ fetch, params}) => {
    const rawOstEvent = await fetch(`/api/events/${params.event}`)
    if (!rawOstEvent.ok) {
        throw new Error(`Event '${params.event}' not found`)
    }
    const ostEvent: OstEvent = await rawOstEvent.json()

    return {
        ostEvent: ostEvent
    }
})
