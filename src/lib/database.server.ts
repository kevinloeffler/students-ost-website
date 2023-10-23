import * as mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {User} from '$lib/models/User.js'
import {OstEvent} from "$lib/models/OstEvent";
import {Organisation} from "$lib/models/Organisation";

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
/* TODO: make VEREINE generic to include Fachschaften */

export async function getAllOrganisations(type: Optional<OrganisationType> = undefined): Promise<Organisation[]> {
    const filter = type ? {type: type} : {}
    const orgs: Organisation[] | null | undefined = await Organisation.find(filter).sort({ 'displayOrder': 'asc' })
    if (!orgs) { return [] }
    return orgs
}

export async function getOrganisation(nameOrId: string): Promise<Optional<Organisation>> {
    if (nameOrId === '') return undefined

    let org: Organisation | undefined | null = await Organisation.findOne({'name': nameOrId})
    if (!org) {
        org = await Organisation.findById(nameOrId)
        if (!org) { return undefined }
    }
    return org
}

export async function createOrganisation() {
    return await Organisation.create({name: "Test Verein", description: "Dies ist ein Test Verein..."})
}


/* USERS */

export async function createUser(user: User): Promise<User> {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return await User.create({username: user.username, password: hashedPassword, group: user.group, organisation: user.organisation})
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
        return await OstEvent.create(ostEvent)
    } catch (error) {
        console.error(error)
    }
}

export async function insertOrUpdateOstEvent(ostEvent: OstEvent): Promise<any> {
    try {
        return await OstEvent.updateOne({_id: ostEvent._id}, ostEvent, {upsert: true})
    } catch (error) {
        console.error(error)
    }
}

export async function getAllOstEvents(): Promise<OstEvent[]> {
    /* TODO: add start from (today) date */
    return OstEvent.find().sort({date: 'asc'});
}

export async function getOstEventsByOrganiser(organiserId: string): Promise<OstEvent[]> {
    return OstEvent.find({'organiserId': organiserId}).sort({date: 'asc'})
}

export async function getOstEvent(nameOrId: string): Promise<Optional<OstEvent>> {
    // TODO: remove ability to use name - see github issue #1
    let ostEvent: Optional<OstEvent> | null

    const isId = nameOrId.length === 24 && !!nameOrId.match(/^\d/)
    if (isId) {
        ostEvent = await OstEvent.findOne({_id: nameOrId})
    } else {
        ostEvent = await OstEvent.findOne({name: nameOrId})
    }

    if (!ostEvent) { return undefined }
    return ostEvent
}

export async function deleteOstEvent(id: string): Promise<any> {
    try {
        return await OstEvent.deleteOne({_id: id})
    } catch (error) {
        console.error(error)
    }
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
// await createUser({username: 'admin@email.ch', password: 'password', group: 'ADMIN', organisation: '650a0bf138f86d2e3598f4ca'})
// createVerein()
// console.log('Query:', await getAllVereine())
