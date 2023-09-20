import mongoose, {Schema} from 'mongoose'

const VereinSchema = new Schema<Verein>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    website: {type: String, required: false},
    email: {type: String, required: false}
})

export const Verein = mongoose.models?.Verein || mongoose.model('Verein', VereinSchema)
