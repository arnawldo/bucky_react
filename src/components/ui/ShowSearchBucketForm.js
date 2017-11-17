import React from "react"
import PropTypes from "prop-types";

const ShowSearchBucketForm = ({user, onSearchBucket}) => {

    let _searchTerm;

    const submit = e => {
        e.preventDefault();
        onSearchBucket(_searchTerm.value, user.username, user.password);
        _searchTerm.value = "";
        _searchTerm.focus();
    };


    return (
        <form id="newBucketForm" onSubmit={submit}>
            <input id="newBucketName" ref={input => _searchTerm = input}
                   type="text"
                   placeholder="search for a bucket..." required/>
            <button id="add-bucketlist">GO</button>
        </form>
    )
};

ShowSearchBucketForm.propTypes = {
    onSearchBucket: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default ShowSearchBucketForm