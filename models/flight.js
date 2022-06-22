import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    content: String,
    rating: {
        type: Number, 
        min: 1,
        max: 5,
        default: 5
    }
}, {
    timestamps: true
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
        required: true
    },
    departs: {
        type: Date,
        default: function() {
            return new Date(new Date().setFullYear(new Date().getFullYear() + 1))  
        } 
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
    Flight
}