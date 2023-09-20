import type { PageLoad } from './$types'

export const load: PageLoad = ( async ({ fetch, params}) => {

    const vereinParameter = params.verein
    const rawVerein = await fetch(`/api/vereine/${encodeURI(vereinParameter)}`)
    const verein: Verein = await rawVerein.json()

    return {
        verein: verein
    }

})
