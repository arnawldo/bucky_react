import React from 'react'
import PropTypes from 'prop-types';

const EditBucketForm = ({bucketId, name, user, onEditBucket, onBucketExitEditMode}) => {

    let _newName;

    const submit = e => {
        e.preventDefault();
        onEditBucket(bucketId, _newName.value, user.username, user.password);
    };


    return (
        <div>
            <form  id="editBucketForm" onSubmit={submit}>
                <input id="newBucketName" ref={input => _newName = input}
                       type="text"
                       placeholder={`${name}`} required/>
                <button id="deleteButton" className="deleteButton"><i className="glyphicon glyphicon-ok"></i></button>
                <button className="deleteButton" onClick={onBucketExitEditMode}><i className="glyphicon glyphicon-remove"></i></button>

            </form>
        </div>
    )
};

EditBucketForm.propTypes = {
    bucketId: PropTypes.number.isRequired,
    onEditBucket: PropTypes.func.isRequired,
    onBucketExitEditMode: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default EditBucketForm
