import type { PageLoad } from './$types'

export const load: PageLoad = ( async ({ fetch, params}) => {

    const organisationParameter = params.fachschaft
    const rawOrganisation = await fetch(`/api/organisation/${encodeURI(organisationParameter)}`)
    const organisation: Organisation = await rawOrganisation.json()

    return {
        fachschaft: organisation
    }

})
