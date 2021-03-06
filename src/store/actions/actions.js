import axios from "axios";
import C from "../../constants";

// API endpoints
export const getAPIURL = () => {
    const envAPIURL = process.env["API_URL"];
    if (envAPIURL === undefined) {
        return "https://bucky-api.herokuapp.com";
    } else {
        return envAPIURL;
    }
};
const SITEURL = getAPIURL();
const USERENDPOINT = SITEURL + "/api/v1.0/auth/users/";
const BUCKETLISTENDPOINT = SITEURL + "/api/v1.0/bucketlists/";

/**
 * Make request to register a new user.
 * Add user to store if successful, show error message otherwise
 *
 * @param {string} username - The username of new user.
 * @param {string} password - The password of new user.
 */
export const registerUser = (username, password) => dispatch =>
    axios({
        method: "post",
        url: USERENDPOINT,

            data: {
                username: username,
                password: password
            }
        })
        .then((res => {
            if (res.status === 201) {
                // user was created
                // add user details to store
                return ({
                    type: C.ADD_USER,
                    username: username,
                    password: password
                })
            }
        }))
        .then(dispatch)
        .catch((error) => {
            if (error.response.status === 409) {
                // user already exists
                // should log in
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "This username already exists!"
                })
            }
        });

/**
 * Make request to check if user is authentic as well as fetch bucket-lists.
 * All endpoints are protected with Http authentication as well as token authentication
 * If request is successful, details should be saved to store and used to authenticate other calls
 *
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const loginUser = (username, password) => dispatch =>
    // check that bucket-lists can be accessed
    axios.get(BUCKETLISTENDPOINT,
        {
            auth: {
                username: username,
                password: password
            }
        })
        .then((res => {
            if (res.status === 200) {
                // user is authorized
                // add user to store
                return ({
                    type: C.ADD_USER,
                    username: username,
                    password: password
                });
            }
        }))
        .then(dispatch)
        .catch((error) => {
            if (error.response.status === 401) {
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Incorrect Username or Password"
                });
            } else {
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "A problem occured... Try again."
                });
            }
        });


/**
 * Clear all messages in store
 */
export const clearNotifications = () =>
    ({
        type: C.CLEAR_NOTIFICATIONS
    });


/**
 * Make request to create a new bucket-list.
 * If request is successful, bucket-list is added to store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {string} name - The name of new bucket-list.
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const addBucketList = (name, username, password) => dispatch =>
    axios({
        method: "post",
        url: BUCKETLISTENDPOINT,
        auth: {
            username: username,
            password: password
        },
        data: {
            name: name
        }
    })
        .then((res) => {
            if (res.status === 201) {
                // bucket-list was created
                // add it to store
                return ({
                    type: C.ADD_BUCKETLIST,
                    bucketId: parseInt(res.data.bucketList.id, 10),
                    name: res.data.bucketList.name
                })
            }
        })
        .then(dispatch)
        .catch((error) => {
            if (error.response.status === 409) {
                // bucket-list already exists
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Bucket-list \"" + name + "\" already exists"
                });
            } else {
                // bad request
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Try again"
                });
            }
        });

/**
 * Make request to delete a bucket-list.
 * If request is successful, bucket-list is removed from store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {number} bucketId - The id of the bucket-list.
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const deleteBucketList = (bucketId, username, password) => dispatch =>
    axios({
        method: "delete",
        url: BUCKETLISTENDPOINT + bucketId,
        auth: {
            username: username,
            password: password
        }
    })
        .then((res) => {
            if (res.status === 200) {
                // bucket-list was deleted
                // delete from store
                return ({
                    type: C.DELETE_BUCKETLIST,
                    bucketId: bucketId
                })
            }
        })
        .then(dispatch)
        .catch((error) => {
            if (error.response.status === 404) {
                // bucket-list does not exist
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Bucket-list no longer exists"
                });
            } else {
                // other server error
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Try again"
                });
            }
        });

/**
 * Make request to edit name of a bucket-list.
 * If request is successful, bucket-list is edited in store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {number} bucketId - The id of the bucket-list.
 * @param {string} newName  - The new name of the bucket-list
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const editBucketList = (bucketId, newName, username, password) => dispatch =>
    axios({
        method: "patch",
        url: BUCKETLISTENDPOINT + bucketId,
        data: {
            "name": newName
        },
        auth: {
            username: username,
            password: password
        }
    })
        .then((res) => {
            if (res.status === 200) {
                // bucket-list was edited successfully
                dispatch({
                    type: C.EDIT_BUCKETIST,
                    bucketId: bucketId,
                    newName: newName
                });
                dispatch(bucketExitEditMode(bucketId));

            }
        })
        .catch((error) => {
            if (error.response.status === 404) {
                // bucket-list does not exist
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Bucket-list no longer exists"
                });
            } else {
                // other server error
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Try again"
                });
            }
        });

/**
 * Make request to fetch 1st page of bucket-lists.
 * If request is successful, first page of bucket-lists is added to store,
 * and info on whether there is another page is set in store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const fetchBucketLists = (username, password) => dispatch =>
    axios({
        method: "get",
        url: BUCKETLISTENDPOINT,
        auth: {
            username: username,
            password: password
        }
    })
        .then((res) => {
                if (res.status === 200) {
                    // bucket-lists received
                    // set them in store
                    dispatch({type: C.SET_BUCKETLISTS, bucketlists: res.data["bucket-lists"]});
                    // set whether next page is there or not
                    if (res.data.next !== null) {
                        dispatch({type: C.HAS_NEXT_PAGE, hasNextPage: true})
                    } else {
                        dispatch({type: C.HAS_NEXT_PAGE, hasNextPage: false})
                    }
                }
            }
        )
        .catch(() => {
            dispatch({
                type: C.ADD_NOTIFICATION,
                notification: "There was a problem getting your bucket-lists"
            });
        });

/**
 * Make request to fetch a particular page of bucket-lists in the store.
 * If request is successful, fetched bucket-lists are appended to the store,
 * and info on whether there is another page is set in store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {number} pageNumber - The page number of bucket-lists to fetch.
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const fetchBucketListsPage = (pageNumber, username, password) => dispatch =>
    axios({
        method: "get",
        url: BUCKETLISTENDPOINT + "?page=" + (pageNumber + 1),
        auth: {
            username: username,
            password: password
        }
    })
        .then((res) => {
                if (res.status === 200) {
                    // bucket-lists received
                    // add them to store
                    dispatch({type: C.APPEND_BUCKETLISTS, bucketlists: res.data["bucket-lists"]});
                    // set whether next page is there or not
                    if (res.data.next !== null) {
                        dispatch({type: C.HAS_NEXT_PAGE, hasNextPage: true})
                    } else {
                        dispatch({type: C.HAS_NEXT_PAGE, hasNextPage: false})
                    }
                    // update current page number
                    dispatch({type: C.SET_CURRENT_PAGE, currentPage: pageNumber + 1})
                }
            }
        )
        .catch(() => {
            dispatch({
                type: C.ADD_NOTIFICATION,
                notification: "There was a problem getting your bucket-lists"
            });
        });

/**
 * Reset page counter for bucket-lists
 */
export const resetPageCounter = () =>
    ({
        type: C.RESET_PAGE_COUNTER
    });


/**
 * Change state of task to edit mode
 *
 * @param {number} bucketId - The id of the bucket-list that contains the task.
 * @param {number} taskId - The id of the task.
 */
export const taskEnterEditMode = (bucketId, taskId) =>
    ({
        type: C.TASK_ENTER_EDIT_MODE,
        bucketId: bucketId,
        taskId: taskId
    });

/**
 * Change state of task out of edit mode
 *
 * @param {number} bucketId - The id of the bucket-list that contains the task.
 * @param {number} taskId - The id of the task.
 */
export const taskExitEditMode = (bucketId, taskId) =>
    ({
        type: C.TASK_EXIT_EDIT_MODE,
        bucketId: bucketId,
        taskId: taskId
    });

/**
 * Change state of bucket-list to edit mode
 *
 * @param {number} bucketId - The id of the bucket-list that contains the task.
 */
export const bucketEnterEditMode = (bucketId) =>
    ({
        type: C.BUCKET_ENTER_EDIT_MODE,
        bucketId: bucketId
    });

/**
 * Change state of bucket-list out of edit mode
 *
 * @param {number} bucketId - The id of the bucket-list that contains the task.
 */
export const bucketExitEditMode = (bucketId) =>
    ({
        type: C.BUCKET_EXIT_EDIT_MODE,
        bucketId: bucketId
    });

/**
 * Clear user details from store
 */
export const removeUser = () =>
    ({
        type: C.REMOVE_USER
    });

/**
 * Clear bucket-lists from store
 */
export const clearBuckets = () =>
    ({
        type: C.DELETE_ALL_BUCKETLISTS
    });

/**
 * Make request to fetch tasks for a bucket-list in the store.
 * If request is successful, fetched tasks are set for bucket-list in the store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {number} bucketId - The id of the bucket-list whose tasks to fetch.
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const fetchTasks = (bucketId, username, password) => dispatch =>
    axios({
        method: "get",
        url: BUCKETLISTENDPOINT + bucketId + "/tasks/",
        auth: {
            username: username,
            password: password
        }
    })
        .then((res) => {
                if (res.status === 200) {
                    // tasks received
                    // set in store
                    return ({
                        type: C.SET_TASKS,
                        bucketId: bucketId,
                        tasks: res.data["tasks"]
                    })
                }
            }
        )
        .then(dispatch)
        .catch((error) => {
            if (error.response.status === 404) {
                dispatch({
                    type: C.SET_TASKS,
                    bucketId: bucketId,
                    tasks: []
                });
            } else {
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "There was a problem getting your tasks"
                });
            }
        });

/**
 * Make request to delete task for a bucket-list in the store.
 * If request is successful, task is removed from store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {number} bucketId - The id of the bucket-list whose task to delete.
 * @param {number} taskId - The id of task to delete.
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const deleteTask = (bucketId, taskId, username, password) => dispatch =>
    axios({
        method: "delete",
        url: BUCKETLISTENDPOINT + bucketId + /tasks/ + taskId,
        auth: {
            username: username,
            password: password
        }
    })
        .then((res) => {
            if (res.status === 200) {
                return ({
                    // task was deleted
                    // remove task from store
                    type: C.DELETE_TASK,
                    taskId: taskId,
                    bucketId: bucketId
                })
            }
        })
        .then(dispatch)
        .catch((error) => {
            if (error.response.status === 404) {
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Task does not exist anymore!"
                });
            } else {
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "There was a problem getting your tasks."
                });
            }
        });

/**
 * Make request to edit description of task.
 * If request is successful, task is edited in store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {number} bucketId - The id of the bucket-list.
 * @param {number} taskId - The id of the bucket-list.
 * @param {string} newDescription  - The new name of the task
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const editTask = (bucketId, taskId, newDescription, username, password) => dispatch =>
    axios({
        method: "patch",
        url: BUCKETLISTENDPOINT + bucketId + /tasks/ + taskId,
        auth: {
            username: username,
            password: password
        },
        data: {
            description: newDescription
        }
    })
        .then((res) => {
            if (res.status === 200) {
                // task was created
                // edit task in store
                dispatch({
                    type: C.EDIT_TASK,
                    taskId: taskId,
                    bucketId: bucketId,
                    newDescription: newDescription
                });
                dispatch(taskExitEditMode(bucketId, taskId));
            }
        })
        .catch((error) => {
            if (error.response.status === 404) {
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Task does not exist anymore!"
                });
            } else {
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "There was a problem getting your tasks."
                });
            }
        });

/**
 * Make request to create a new task.
 * If request is successful, task is added to store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {number} bucketId - The id of the bucket-list.
 * @param {string} description  - The new name of the task
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const addTask = (bucketId, description, username, password) => dispatch =>
    axios({
        method: "post",
        url: BUCKETLISTENDPOINT + bucketId + /tasks/,
        auth: {
            username: username,
            password: password
        },
        data: {
            description: description
        }
    })
        .then((res) => {
            if (res.status === 201) {
                return ({
                    // task was created
                    // add it to store
                    type: C.ADD_TASK,
                    taskId: res.data.task.id,
                    bucketId: bucketId,
                    description: description
                })
            }
        })
        .then(dispatch)
        .catch((error) => {
            if (error.response.status === 409) {
                // task already exists
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Task \"" + description + "\" already exists."
                });
            } else {
                // other server error
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Try again."
                });
            }
        });

/**
 * Make request to search for bucket-lists matching a search term.
 * If request is successful, add searched bucket-lists to store.
 * If request is unsuccessful, a helpful message will be dispatched
 *
 * @param {string} searchTerm  - The letters to match bucket-lists' names.
 * @param {string} username - The username of user.
 * @param {string} password - The password of user.
 */
export const fetchSearchedBucketLists = (searchTerm, username, password) => dispatch =>
    axios({
        method: "get",
        url:  BUCKETLISTENDPOINT + "search/" + searchTerm,
        auth: {
            username: username,
            password: password
        }
    })
        .then((res) => {
                if (res.status === 200) {
                    // matched bucket-lists received
                    // add them to store
                    return ({
                        type: C.ADD_SEARCHED_BUCKETLISTS,
                        bucketlists: res.data["bucket-lists"]
                    })
                }
            }
        )
        .then(dispatch)
        .catch(() => {
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "Try again."
                });
        });

/**
 * Clear searched bucket-lists from store
 */
export const clearSearchedBuckets = () =>
    ({
        type: C.DELETE_ALL_SEARCHED_BUCKETLISTS
    });