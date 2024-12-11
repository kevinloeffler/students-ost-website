import type { PageLoad } from './$types'

export const load: PageLoad = ( async ({ fetch, params}) => {
    const rawOrganisations = await fetch('/api/organisation?type=Verein')
    const organisations: Organisation[] = await rawOrganisations.json()
    organisations.sort((a, b) => a.name.localeCompare(b.name))

    return {
        vereine: organisations
    }
})
