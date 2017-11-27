import React from 'react'
import PropTypes from 'prop-types';

const AddBucketForm = ({user, onNewBucket}) => {

    let _name;

    const submit = e => {
        e.preventDefault();
        onNewBucket(_name.value, user.username, user.password);
        _name.value = '';
        _name.focus()
    };


    return (
        <form id="newBucketForm" onSubmit={submit}>
            <input id="newBucketName" ref={input => _name = input}
                   type="text"
                   placeholder="add bucket..." required/>
            <button id="add-bucketlist"><i className="glyphicon glyphicon-plus"></i></button>
        </form>
    )
};

AddBucketForm.propTypes = {
    onNewBucket: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default AddBucketForm