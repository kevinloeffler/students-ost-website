import inquirer from 'inquirer'
import bcrypt from 'bcrypt'

// Output styling:
function bold(text) {
    let end = '\x1b[0m'
    if (text.endsWith(end)) {
        end = ''
    }
    return '\x1b[1m' + text + end
}

function cyan(text) {
    let end = '\x1b[0m'
    if (text.endsWith(end)) {
        end = ''
    }
    return '\x1b[36m' + text + end
}

const connect_to_db_hint = `
Connect to the db:
    ssh into the server (user: admin)
    sudo docker exec -it MONGO_CONTAINER_ID bash
    mongosh mongodb://localhost:27017/students_ost_db`


console.log('This script helps you create a new database entry (User / Verein / Fachschaft) for the website')
console.log('This functionality should be implemented as an admin feature with a UI on the website but until then' +
    'this script should help with the process.')

console.log('-----------------------------------------')

const type = await inquirer.prompt([
    {
        name: 'type',
        message: 'What would you like to create?',
        type: 'list',
        choices: ['User', 'Verein', 'Fachschaft'],
    }
])

/***************************** USER *****************************/

if (type.type === 'User') {

    console.log('\nBefore we begin: If you want to assign the user to an organisation (recommended) you first need to' +
        ' get the organisation object id.')
    console.log('   If you know the organisation name: db.organisations.findOne({name: "NAME"})._id')
    console.log('   If you want to display all organisations: db.organisations.find()\n')

    const user = await inquirer.prompt([
        {
            name: 'username',
            message: 'Username',
            type: 'input',
            validate: (name) => {
                if (!name.length) return 'Please provide a username'
                if (name.length <= 3 || name.length > 50) return 'Please provide a username between 4 and 50 characters long'
                return true;
            },
        },
        {
            name: 'password',
            message: 'Password',
            type: 'input',
            validate: (pw) => {
                if (pw.length < 12) return 'password needs to be at least 12 characters long'
                return true;
            },
        },
        {
            name: 'group',
            message: 'Group',
            type: 'list',
            choices: ['USER', 'ADMIN', 'ROOT'],
        },
        {
            name: 'organisation',
            message: 'Organisation (optional)',
            type: 'input',
            placeholder: 'ObjectID of event',
        }
    ])

    user.password = await bcrypt.hash(user.password, 10)
    const mongoCommand = `db.users.insertOne({username:'${user.username}', password:'${user.password}', group:'${user.group}', organisation:'${user.organisation}'})`

    console.log('\nAll right, to insert the user into the db use the following command:')
    console.log(bold(cyan(mongoCommand)))
    console.log(connect_to_db_hint)
}


/***************************** Organisation *****************************/

async function promptOrganisation(type) {
    const organisation = await inquirer.prompt([
        {
            name: 'name',
            message: 'Name',
            type: 'input',
            validate: (name) => {
                if (!name.length) return 'Please provide a name'
                if (name.length < 3 || name.length > 50) return 'Please provide a name between 3 and 50 characters' +
                    ' long'
                return true;
            },
        },
        {
            name: 'description',
            message: 'Description',
            type: 'input',
        },
        {
            name: 'logo',
            message: 'Logo (optional: link to image)',
            type: 'input',
        },
        {
            name: 'website',
            message: 'Website (optional: url)',
            type: 'input',
            when: (answers) => answers.name !== ''
        },
        {
            name: 'email',
            message: 'Email (optional)',
            type: 'input',
        },
        {
            name: 'displayOrder',
            message: 'Display Order (optional)',
            type: 'number',
        },
    ])

    // remove empty answers
    const logo = organisation.logo ? `, logo:'${organisation.logo}'` : ''
    const website = organisation.website ? `, website:'${organisation.website}'` : ''
    const email = organisation.email ? `, email:'${organisation.email}'` : ''
    const displayOrder = organisation.displayOrder ? `, displayOrder:'${organisation.displayOrder}'` : ''

    const mongoCommand = `db.organisations.insertOne({name:'${organisation.name}', type:'${type}', description:'${organisation.description}'${logo}${website}${email}${displayOrder}})`

    console.log(`All right, to insert the ${type} into the db use the following command:`)
    console.log(bold(cyan(mongoCommand)))
    console.log(connect_to_db_hint)
}


/***************************** Verein *****************************/

if (type.type === 'Verein') {
    await promptOrganisation('Verein')
}


/***************************** Fachschaft *****************************/

if (type === 'Fachschaft') {
    await promptOrganisation('Fachschaft')
}
