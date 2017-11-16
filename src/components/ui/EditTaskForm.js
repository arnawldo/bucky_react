import React from 'react'
import PropTypes from 'prop-types';

const EditTaskForm = ({bucketId, taskId, description, user, onEditTask, onTaskExitEditMode}) => {

    let _newDescription;

    const submit = e => {
        e.preventDefault();
        onEditTask(bucketId, taskId, _newDescription.value, user.username, user.password);
    };


    return (
        <div>
            <form  id="editBucketForm" onSubmit={submit}>
                <input id="newBucketName" ref={input => _newDescription = input}
                       type="text"
                       placeholder={`${description}`} required/>
                <button id="deleteButton" className="deleteButton">
                    <i className="glyphicon glyphicon-ok"></i>
                </button>
                <button id="deleteButton" className="deleteButton" onClick={onTaskExitEditMode}>
                    <i className="glyphicon glyphicon-remove"></i>
                </button>
            </form>
        </div>
    )
};

EditTaskForm.propTypes = {
    bucketId: PropTypes.number.isRequired,
    taskId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onTaskExitEditMode: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default EditTaskForm
