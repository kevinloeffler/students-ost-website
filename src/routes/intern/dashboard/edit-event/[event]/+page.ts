import type { PageLoad } from './$types'

export const load: PageLoad = ( async ({ fetch, params}) => {
    const rawOstEvent = await fetch(`/api/events/${params.event}`)
    const ostEvent: OstEvent = await rawOstEvent.json()

    return {
        ostEvent: ostEvent,
    }
})
