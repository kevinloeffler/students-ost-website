import type { PageLoad } from "../../$types";
import {redirect} from "@sveltejs/kit";

export const load: PageLoad = ( async ({ fetch }) => {
    const response = await fetch('/api/intern/dashboard')
    if (response.status === 401) {
        console.log('unauthorized -> redirecting')
        throw redirect(302, '/intern/login')
    }
    const dashboard: {org: Organisation, orgEvents: OstEvent[]} = await response.json()
    return {
        organisation: dashboard.org,
        orgEvents: dashboard.orgEvents,
    }
})
