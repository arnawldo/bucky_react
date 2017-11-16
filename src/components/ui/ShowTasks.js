import React, {Component} from "react";
import PropTypes from "prop-types";
import Task from "./Task";


class ShowTasks extends Component {

    constructor(props) {
        super(props);
        this.goToRegister = this.goToRegister.bind(this);
    }

    componentDidMount() {
        const {user, onFetchTasks, bucketId} = this.props;
        if (user.hasOwnProperty("username")) {
            onFetchTasks(bucketId, user.username, user.password)
        }
    }

    goToRegister() {
        const { history } = this.props;
        history.push("/register");
    }

    render() {

        const {user, bucketId, bucketlists, onRemoveTask, onTaskExitEditMode, onTaskEnterEditMode, onEditTask } = this.props;

        if (user.hasOwnProperty("username")) {

            const getTasks = (array, id) => {
                const arr = array.filter(bk => bk.id === id);
                const first = arr[0];
                return first["tasks"];
            };

            const tasks = getTasks(bucketlists, bucketId, 10);

            return (
                <ul id="list-of-tasks" className="gloria-font">
                    {(tasks.length === 0) ?
                        <li className="task">No Tasks Here. (Add a Task)</li> :
                        tasks.map((task, i) =>
                            <Task key={i}
                                  {...task}
                                  user={user}
                                  bucketId={bucketId}
                                  taskId={task.id}
                                  onTaskExitEditMode={() => onTaskExitEditMode(bucketId, task.id)}
                                  onTaskEnterEditMode={() => onTaskEnterEditMode(bucketId, task.id)}
                                  onEditTask={onEditTask}
                                  onRemoveTask={() => onRemoveTask(bucketId, task.id, user.username, user.password)}/>
                        )
                    }
                </ul>
            );
        } else {
            this.goToRegister();
            return null;
        }



    }
}

ShowTasks.propTypes = {
    bucketlists: PropTypes.array.isRequired,
    onRemoveTask: PropTypes.func.isRequired,
    onFetchTasks: PropTypes.func.isRequired,
    bucketId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onTaskExitEditMode: PropTypes.func.isRequired,
    onTaskEnterEditMode: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired
};


export default ShowTasks

