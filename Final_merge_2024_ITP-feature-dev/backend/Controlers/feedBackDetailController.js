const FeedBackDetails = require('../Model/feedBackDetailModel');

//Controller for save a feedBackDetail
const postFeedBackDetails = async (request, response) => {
    try {
        if (
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.email ||
            !request.body.telephone ||
            !request.body.chickinDate ||
            !request.body.durationOfYouStay ||
            !request.body.country ||
            !request.body.district ||
            !request.body.hearAbout ||
            !request.body.resonOfVisit ||
            !request.body.overAllRatting ||
            !request.body.suggestion
        ) {
            return response.status(400).send({
                message: 'send all required fields',
            });
        }
        const newFeedBackDetails = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            telephone: request.body.telephone,
            chickinDate: request.body.chickinDate,
            durationOfYouStay: request.body.durationOfYouStay,
            country: request.body.country,
            district: request.body.district,
            hearAbout: request.body.hearAbout,
            resonOfVisit: request.body.resonOfVisit,
            overAllRatting: request.body.overAllRatting,
            suggestion: request.body.suggestion,
        };

        const feedBackDetail = await FeedBackDetails.create(newFeedBackDetails);

        return response.status(201).send(feedBackDetail);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

//Controller for viewing all feedBackDetails
const getFeedBackDetails = async (request, response) => {
    try {
        const feedBackDetails = await FeedBackDetails.find({});
        return response.status(200).json({
            count: feedBackDetails.length,
            data: feedBackDetails,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

//Controller for getting one feedBackDetail by id
const getoneFeedBackDetails = async (request, response) => {
    try {
        const { id } = request.params;
        const feedBackDetail = await FeedBackDetails.findById(id);

        return response.status(200).json(feedBackDetail);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

//Controller for updating feedBackDetail by id
const putFeedBackDetails = async (request, response) => {
    try {
        if (
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.email ||
            !request.body.telephone ||
            !request.body.chickinDate ||
            !request.body.durationOfYouStay ||
            !request.body.country ||
            !request.body.district ||
            !request.body.hearAbout ||
            !request.body.resonOfVisit ||
            !request.body.overAllRatting ||
            !request.body.suggestion
        ) {
            return response.status(400).send({
                message: 'send all required fields',
            });
        }

        const { id } = request.params;
        const result = await FeedBackDetails.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Not found' });
        }

        return response.status(200).send({ message: 'Updated Successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

//Controller for deleting a feedBackDetail
const deleteFeedBackDetails = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await FeedBackDetails.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Not found' });
        }

        return response.status(200).send({ message: 'Deleted Successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

module.exports = {
    postFeedBackDetails,
    getFeedBackDetails,
    getoneFeedBackDetails,
    putFeedBackDetails,
    deleteFeedBackDetails,
};
