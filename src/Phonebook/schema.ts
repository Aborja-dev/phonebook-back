import mongoose from "mongoose"

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Phone = mongoose.model('Phone', phoneSchema)
export default Phone