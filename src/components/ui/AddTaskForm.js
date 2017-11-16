import React from 'react'
import PropTypes from 'prop-types';

const AddTaskForm = ({bucket_id, onNewTask = f => f}) => {

    let _description;

    const submit = e => {
        e.preventDefault();
        onNewTask(bucket_id, _description.value, "arnold", "test");
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
    bucketId: PropTypes.number.isRequired
};

export default AddTaskForm
