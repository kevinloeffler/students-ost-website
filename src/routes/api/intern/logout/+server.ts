import type {RequestHandler} from "@sveltejs/kit";
import {json} from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies}) => {
    cookies.set('jwt', '', {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        path: '/',
        maxAge: 0,
    })
    return json({status: true})
}
