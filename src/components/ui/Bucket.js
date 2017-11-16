import React from 'react'
import PropTypes from 'prop-types';
import EditBucketForm from "./EditBucketForm";


const Bucket = ({
                    id, editMode, name, user, onRemoveBucket, onBucketEnterEditMode,
                    onEditBucket, onBucketExitEditMode
                }) => {


    if (editMode) {
        return <EditBucketForm id={id} name={name} onEditBucket={onEditBucket} user={user}
                               onBucketExitEditMode={onBucketExitEditMode}/>;
    } else {
        return <li className="bucket">
            <a href={"/bucketlists/:id/tasks".replace(':id', id)}>{name}</a>
            <button id="deleteButton" className="deleteButton" onClick={onRemoveBucket}><i
                className="glyphicon glyphicon-remove"></i></button>
            <button className="deleteButton" onClick={onBucketEnterEditMode}><span
                className="glyphicon glyphicon-pencil"></span>
            </button>
        </li>;
    }
};


Bucket.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    editMode: PropTypes.bool.isRequired,
    onRemoveBucket: PropTypes.func.isRequired,
    onBucketEnterEditMode: PropTypes.func.isRequired,
    onEditBucket: PropTypes.func.isRequired

};

export default Bucket