import React from "react"
import PropTypes from "prop-types";
import EditTaskForm from "./EditTaskForm"

const Task = ({bucketId, taskId, user, editMode, description, onRemoveTask, onEditTask, onTaskEnterEditMode, onTaskExitEditMode}) => {
    if (editMode) {
        return <EditTaskForm bucketId={bucketId} taskId={taskId} user={user} description={description}
                             onEditTask={onEditTask} onTaskExitEditMode={onTaskExitEditMode}/>
    } else {
        return <li className="bucket">
            {description}
            <button id="deleteButton" className="deleteButton" onClick={onRemoveTask}>
                <i className="glyphicon glyphicon-remove"></i>
            </button>
            <button className="deleteButton" onClick={onTaskEnterEditMode}>
                <span className="glyphicon glyphicon-pencil"></span>
            </button>
        </li>;
    }
};

Task.propTypes = {
    bucketId: PropTypes.number.isRequired,
    taskId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    onRemoveTask: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onTaskEnterEditMode: PropTypes.func.isRequired,
    onTaskExitEditMode: PropTypes.func.isRequired
};

export default Task
