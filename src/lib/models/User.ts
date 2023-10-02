import mongoose, {Schema} from 'mongoose'

const UserSchema = new Schema<User>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    group: {type: String, required: true, default: 'USER'},
    organisation: {type: String, required: false},
})

export const User = mongoose.models?.User || mongoose.model('User', UserSchema)
