const mongoose = require("mongoose");

const feedBackDetailSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        telephone: {
            type: Number,
        },
        chickinDate: {
            type: Date,
        },
        durationOfYouStay: {
            type: Number,
        },
        country: {
            type: String,
        },
        district: {
            type: String,
        },
        hearAbout: {
            type: String,
        },
        resonOfVisit: {
            type: String,
        },
        overAllRatting: {
            type: Number,
        },
        suggestion: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const FeedBackDetails = mongoose.model('feedBackDetail', feedBackDetailSchema);

module.exports = FeedBackDetails;