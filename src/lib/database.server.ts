import * as mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {Verein} from './models/Verein.js'
import {User} from '$lib/models/User.js'

const DB_URI: string = process.env.DB_URI || 'mongodb://127.0.0.1:27017'
const DB_NAME: string = process.env.DB_NAME || 'students_ost_db'

const dbConnectionUrl: string = `${DB_URI}/${DB_NAME}`

async function main() {
    try {
        await mongoose.connect(dbConnectionUrl)
        console.log(`MongoDB connected: ${dbConnectionUrl}`)
    } catch (err) {
        console.error(err)
    }
}

await main()

export async function getAllVereine(): Promise<Verein[]> {
    const vereine: Verein[] | null | undefined = await Verein.find()
    if (!vereine) { return [] }
    return vereine
}

export async function getVerein(name: string): Promise<Verein | null> {
    const verein: Verein | undefined | null = await Verein.findOne({'name': name})
    if (verein === undefined) { return null }
    return verein
}

export async function createVerein() {
    return await Verein.create({name: "Test Verein", description: "Dies ist ein Test Verein..."})
}

export async function createUser(user: User): Promise<User> {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return await User.create({username: user.username, password: hashedPassword, group: user.group})
    } catch (error: any) {
        if (error.code == 11000) {
            throw {
                name: 'DUPLICATE KEY ERROR',
                message: 'DB ERROR: Username (email) already exists',
                cause: error,
                code: 1
            }
        }
        throw error
    }
}

export async function getUserByUsername(username: string): Promise<User> {
    const user: User | undefined | null = await User.findOne({'username': username})
    if (!user) {
        throw {
            name: 'INEXISTENT USERNAME',
            message: 'A user with the given username does not exist',
            code: 20,
            where: 'Error in getUserByUsername function'
        }
    }
    return user
}

// await createUser({username: 'root@email.ch', password: 'password', group: 'ROOT'})

// createVerein()
// console.log('Query:', await getAllVereine())
