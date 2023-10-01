import type {PageLoad} from "./$types";
import {redirect} from "@sveltejs/kit";

export const load: PageLoad = ( async ({ fetch }) => {
    const response = await fetch('/api/intern/dashboard')
    if (response.status === 401) {
        console.log('unauthorized -> redirecting')
        throw redirect(302, '/intern/login')
    }
    const dashboard = await response.json()
    return {
        dashboard: dashboard
    }
})
