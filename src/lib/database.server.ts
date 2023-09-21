import * as mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {Verein} from './models/Verein.js'
import {User} from '$lib/models/User.js'
import {OstEvent} from "$lib/models/OstEvent";

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

/* VEREINE */

export async function getAllVereine(): Promise<Verein[]> {
    const vereine: Verein[] | null | undefined = await Verein.find()
    if (!vereine) { return [] }
    return vereine
}

export async function getVerein(name: string): Promise<Optional<Verein>> {
    const verein: Verein | undefined | null = await Verein.findOne({'name': name})
    if (!verein) { return undefined }
    return verein
}

export async function createVerein() {
    return await Verein.create({name: "Test Verein", description: "Dies ist ein Test Verein..."})
}

/* USERS */

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

/* EVENTS */

export async function createOstEvent(ostEvent: OstEvent): Promise<Optional<OstEvent>> {
    try {
        return await OstEvent.create({
            name: ostEvent.name,
            date: ostEvent.date,
            description: ostEvent.description,
            mainImage: ostEvent.mainImage,
            startTime: ostEvent.startTime,
            endTime: ostEvent.endTime,
            entranceFee: ostEvent.entranceFee,
            contactEmail: ostEvent.contactEmail,
            contactPhone: ostEvent.contactPhone,
            organiser: ostEvent.organiser,
            linkName: ostEvent.linkName,
            link: ostEvent.link,
        })
    } catch (error) {
        console.error(error)
    }
}

export async function getAllOstEvents(): Promise<OstEvent[]> {
    /* TODO: add start from (today) date */
    return OstEvent.find().sort({date: 'asc'});
}

export async function getOstEvent(name: string): Promise<Optional<OstEvent>> {
    const ostEvent: Optional<OstEvent> | null = await OstEvent.findOne({name: name})
    if (!ostEvent) { return undefined }
    return ostEvent
}


/*
const testOstEvent: OstEvent = {
    name: 'Test Event',
    date: new Date(),
    description: 'Hier kommt etwas über den Event. Wichtige Informationen usw. Das kann gut ein paar Zeilen lang sein oder sogar noch länger...',
    startTime: '18:00',
    endTime: '23:00',
    linkName: 'Website',
    link: 'https://google.com',
}
await createOstEvent(testOstEvent)
*/
// await createUser({username: 'root@email.ch', password: 'password', group: 'ROOT'})

// createVerein()
// console.log('Query:', await getAllVereine())
