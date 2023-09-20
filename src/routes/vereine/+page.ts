import type { PageLoad } from './$types'

export const load: PageLoad = ( async ({ fetch, params}) => {
    const rawVereine = await fetch('/api/vereine')
    const vereine: Verein[] = await rawVereine.json()

    return {
        vereine: vereine
    }
})
