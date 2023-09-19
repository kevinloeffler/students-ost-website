import mongoose, {Schema} from 'mongoose'

const VereinSchema = new Schema<Verein>({
    name: {type: String, required: true},
    description: {type: String, required: true}
})

export const Verein = mongoose.models?.Verein || mongoose.model('Verein', VereinSchema)
