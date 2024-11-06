import type { PageLoad } from './$types'

export const load: PageLoad = ( async ({ fetch, params }) => {
    const rawOstEvents = await fetch('/api/events')
    const ostEvents: OstEvent[] = await rawOstEvents.json()

    return {
        ostEvents: ostEvents
    }
})
