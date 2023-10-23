import type { PageLoad } from './$types'

export const load: PageLoad = ( async ({ fetch, params}) => {
    const rawOrganisations = await fetch('/api/organisation?type=Fachschaft')
    const organisations: Organisation[] = await rawOrganisations.json()

    return {
        fachschaften: organisations
    }
})
