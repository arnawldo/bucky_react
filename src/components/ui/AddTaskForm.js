import React from 'react'
import PropTypes from 'prop-types';

const AddTaskForm = ({bucketId, onNewTask, user}) => {

    let _description;

    const submit = e => {
        e.preventDefault();
        onNewTask(bucketId, _description.value, user.username, user.password);
        _description.value = '';
        _description.focus()
    };


    return (
        <form id="newTaskForm" onSubmit={submit}>
            <input id="newTaskName" ref={input => _description = input}
                   type="text"
                   placeholder="add task..." required/>
            <button id="addTask"><i className="glyphicon glyphicon-plus"></i></button>
        </form>
    )
};

AddTaskForm.propTypes = {
    onNewTask: PropTypes.func.isRequired,
    bucketId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
};

export default AddTaskForm
