import React from 'react'
import PropTypes from 'prop-types';


const ShowMoreBucketsButton = ({ user, bucketPaginator, onFetchBucketPage}) => {

    const getNextPage = (e) => {
        e.preventDefault();
        onFetchBucketPage(bucketPaginator.page, user.username, user.password)
    };

    return (<li className="more-buckets-button-container">
        {(bucketPaginator.hasNextPage === true) ?
            <a href="/ignore-this-url" className="more-buckets-button-container" onClick={getNextPage}>
                <i className="glyphicon glyphicon-plus" id="more-buckets-button"></i>
            </a> : null}
    </li>)
};

ShowMoreBucketsButton.propTypes = {
    user: PropTypes.object.isRequired,
    bucketPaginator: PropTypes.object.isRequired,
    onFetchBucketPage: PropTypes.func.isRequired
};


export default ShowMoreBucketsButton
