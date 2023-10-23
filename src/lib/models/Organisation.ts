import mongoose, {Schema} from 'mongoose'

const OrganisationSchema = new Schema<Organisation>({
    name: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    logo: {type: String, required: false},
    website: {type: String, required: false},
    email: {type: String, required: false},
    displayOrder: {type: Number, required: false},
})

export const Organisation = mongoose.models?.Organisation || mongoose.model('Organisation', OrganisationSchema)
