import type { PageLoad } from './$types'

export const load: PageLoad = ( async ({ fetch, params}) => {
    const rawOrganisations = await fetch('/api/organisation?type=Fachschaft')
    const organisations: Organisation[] = await rawOrganisations.json()
    organisations.sort((a, b) =>
        a.name.replace(/Fachschaft/g, "").trim().localeCompare(b.name.replace(/Fachschaft/g, "").trim())
    );

    return {
        fachschaften: organisations
    }
})
