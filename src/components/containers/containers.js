import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    addBucketList, addTask, bucketEnterEditMode, bucketExitEditMode, clearBuckets, clearNotifications, deleteBucketList,
    deleteTask,
    editBucketList, editTask,
    fetchBucketLists, fetchBucketListsPage, fetchTasks,
    loginUser,
    registerUser, removeUser, resetPageCounter, taskEnterEditMode, taskExitEditMode
} from "../../store/actions/actions";
import ShowRegister from "../ui/ShowRegister";
import ShowLogin from "../ui/ShowLogin";
import ShowNotifications from "../ui/ShowNotifications";
import AddBucketForm from "../ui/AddBucketForm";
import ShowBucketName from "../ui/ShowBucketName";
import ShowBuckets from "../ui/ShowBuckets";
import ShowWelcome from "../ui/ShowWelcome";
import ShowLogout from "../ui/ShowLogout";
import AddTaskForm from "../ui/AddTaskForm";
import ShowTasks from "../ui/ShowTasks";
import ShowNavBar from "../ui/ShowNavBar";


export const LoginPage = withRouter(connect(
    (state, props) =>
        ({
            user: {...state.user},
            history: props.history
        }),
    dispatch =>
        ({
            onLogin(username, password) {
                dispatch(loginUser(username, password))
            }
        })
)(ShowLogin));


export const RegisterPage = withRouter(connect(
    (state, props) =>
        ({
            user: {...state.user},
            history: props.history
        }),
    dispatch =>
        ({
            onRegister(username, password) {
                dispatch(registerUser(username, password))
            }
        })
)(ShowRegister));

export const Notifications = withRouter(connect(
    state => ({
        notifications: [...state.notifications]
    }),
    dispatch => ({
        onClearNotifications() {
            dispatch(clearNotifications())
        }
    })
)(ShowNotifications));

export const NewBucketList = connect(
    state =>
        ({
            user: {...state.user}
        }),
    dispatch =>
        ({
            onNewBucket(name, username, password) {
                dispatch(addBucketList(name, username, password))
            }
        })
)(AddBucketForm);

export const BucketLists = withRouter(connect(
    (state, props) =>
        ({
            user: {...state.user},
            bucketlists: [...state.bucketlists],
            bucketPaginator: {...state.bucketPaginator},
            history: props.history
        }),
    dispatch =>
        ({
            onRemoveBucket(bucketId, username, password) {
                dispatch(deleteBucketList(bucketId, username, password))
            },
            onEditBucket(bucketId, newName, username, password) {
                dispatch(editBucketList(bucketId, newName, username, password))
            },
            onBucketEnterEditMode(bucketId) {
                dispatch(bucketEnterEditMode(bucketId))
            },
            onBucketExitEditMode(bucketId) {
                dispatch(bucketExitEditMode(bucketId))
            },
            onFetchBuckets(username, password) {
                dispatch(fetchBucketLists(username, password))
            },
            onFetchBucketPage(pageNumber, username, password) {
                dispatch(fetchBucketListsPage(pageNumber, username, password))
            },
            onResetPageCounter() {
                dispatch(resetPageCounter())
            }
        })
)(ShowBuckets));


export const BucketName = withRouter(connect(
    (state, props) =>
        ({
            bucketId: parseInt(props.match.params.id, 10),
            bucketlists: [...state.bucketlists]
        }),
    null
)(ShowBucketName));

export const NewTask = withRouter(connect(
    (state, props) =>
        ({
            bucketId: parseInt(props.match.params.id, 10),
            user: {...state.user}
        }),
    dispatch =>
        ({
            onNewTask(bucketId, description, username, password) {
                dispatch(addTask(bucketId, description, username, password))
            }
        })
)(AddTaskForm));


export const Tasks = withRouter(connect(
    (state, props) =>
        ({
            user: {...state.user},
            bucketlists: [...state.bucketlists],
            bucketId: parseInt(props.match.params.id, 10),
            history: props.history
        }),
    dispatch =>
        ({
            onFetchTasks(bucketId, username, password) {
                dispatch(fetchTasks(bucketId, username, password))
            },
            onRemoveTask(bucketId, taskId, username, password) {
                dispatch(deleteTask(bucketId, taskId, username, password))
            },
            onTaskExitEditMode(bucketId, taskId) {
                dispatch(taskExitEditMode(bucketId, taskId))
            },
            onTaskEnterEditMode(bucketId, taskId) {
                dispatch(taskEnterEditMode(bucketId, taskId))
            },
            onEditTask(bucketId, taskId, newDescription, username, password) {
                dispatch(editTask(bucketId, taskId, newDescription, username, password))
            }
        })
)(ShowTasks));



export const WelcomePage = withRouter(connect(
    (state, props) =>
        ({
            history: props.history,
            user: {...state.user}
        }),
    null
)(ShowWelcome));

export const LogoutPage = withRouter(connect(
    (state, props) =>
        ({
            user: {...state.user},
            history: props.history
        }),
    dispatch =>
        ({
            onClearBuckets() {
                dispatch(clearBuckets())
            },
            onClearUser() {
                dispatch(removeUser())
            }
        })
)(ShowLogout));

export const NavBar = withRouter(connect(
    (state, props) =>
        ({
            user: {...state.user},
            history: props.history
        }),
    null
)(ShowNavBar));