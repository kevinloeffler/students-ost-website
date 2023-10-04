import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {getUserByUsername} from '$lib/database.server.js'

const JWT_EXPIRES_IN: number = parseInt(process.env.AUTH_MAX_AGE || '') || 60 * 60 * 24  // in seconds
const JWT_SECRET: string = process.env.JWT_SECRET as string

if (JWT_SECRET === undefined) { throw new Error('Missing env variable: JWT_SECRET') }

export function createJWT(accessToken: AccessToken) {
    return jwt.sign(accessToken, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
}

export function readJWT(token: Optional<string>): AccessToken {
    let payload: any

    if (!token) {
        throw {name: 'NO TOKEN FOUND', message: 'No JWT found', code: 32}
    }

    try {
        payload = jwt.verify(token, JWT_SECRET)
    } catch (error) {
        throw {name: 'INVALID TOKEN', message: 'The JWT has no valid signature', code: 30, cause: error}
    }

    if (!payload.hasOwnProperty('group') || !payload.hasOwnProperty('username')) {
        throw {name: 'INCOMPLETE TOKEN', message: 'The JWT does not have the required properties', code: 31}
    }

    return {group: payload.group, username: payload.username}
}

export async function authenticateUserWithPassword(username: string, password: string): Promise<AccessToken> {
    const user = await getUserByUsername(username)

    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
        throw {name: 'WRONG PASSWORD', message: 'wrong password for the given user', code: 21}
    }

    return {group: user.group, username: user.username}
}
