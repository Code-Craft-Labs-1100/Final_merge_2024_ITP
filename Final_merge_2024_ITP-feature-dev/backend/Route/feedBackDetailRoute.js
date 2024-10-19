const express = require('express');
const { 
    getFeedBackDetails, 
    postFeedBackDetails, 
    getoneFeedBackDetails, 
    putFeedBackDetails, 
    deleteFeedBackDetails 
} = require('../Controlers/feedBackDetailController');

const router = express.Router();

// Route for saving feedback detail
router.post('/', postFeedBackDetails);

// Route for viewing all feedback details
router.get('/', getFeedBackDetails);

// Route for getting one feedback detail by id
router.get('/:id', getoneFeedBackDetails);

// Route for updating feedback detail by id
router.put('/:id', putFeedBackDetails);

// Route for deleting a feedback detail by id
router.delete('/:id', deleteFeedBackDetails);

module.exports = router;
