import mongoose, {Schema} from 'mongoose'

const OstEventSchema = new Schema<OstEvent>({
    // required properties
    name: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    // optional properties
    mainImage: {type: Buffer, required: false},
    startTime: {type: Number, required: false},
    endTime: {type: Number, required: false},
    entranceFee: {type: Number, required: false},
    contactEmail: {type: String, required: false},
    contactPhone: {type: String, required: false},
    organiser: {type: String, required: false},
    linkName: {type: String, required: false},
    link: {type: String, required: false},
})

export const OstEvent = mongoose.models?.OstEvent || mongoose.model('OstEvent', OstEventSchema)
