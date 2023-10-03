import type {ActionFailure, Actions} from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";
import {authenticateUserWithPassword, createJWT} from "$lib/auth.server";

export const actions: Actions = {
    default: async (event): Promise<loginActionStatus | ActionFailure<{error: string}>> => {
        const formData = await event.request.formData()
        const email = formData.get('email') as string | null
        const password = formData.get('password') as string | null

        if (!email || !password) {
            return fail(400, {'error': 'Invalid login form input'})
        }

        let accessToken
        try {
            accessToken = await authenticateUserWithPassword(email, password)
        } catch (error: any) {
            return { loggedIn: false, reason: error?.message }
        }

        const jwt = createJWT(accessToken)

        event.cookies.set('jwt', jwt, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            path: '/',
            maxAge: parseInt(process.env.AUTH_MAX_AGE || '') || 60 * 60  // valid for 1 hour
        })

        const redirectTo = event.url.searchParams.get('redirectTo') || '/intern/intern'
        throw redirect(303, redirectTo)

        // return {loggedIn: true, reason: 'valid login credentials'}
    }
}


type loginActionStatus = {
    loggedIn: boolean,
    reason: Optional<string>,
}
