import React from 'react'
import PropTypes from 'prop-types';

const ShowBucketName = ({bucketId, bucketlists}) => {

    const findBucket = (id, array) => {
        let arr;
        arr = array.filter(b => b.id === id);
        return arr[0];
    };


    const name = findBucket(bucketId, bucketlists).name;

    return (
        <div className="page-header">
            <h1>{name}</h1>
        </div>
    )
};

ShowBucketName.propTypes = {
    bucketId: PropTypes.number.isRequired,
    bucketlists: PropTypes.array.isRequired
};

export default ShowBucketName
