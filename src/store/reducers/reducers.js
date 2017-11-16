import C from "../../constants"

// Single Task Reducer
export const task = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_TASK:
            return {
                id: parseInt(action.taskId, 10),
                description: action.description,
                editMode: false
            };
        case C.EDIT_TASK:
            return {
                ...state,
                description: action.newDescription
            };
        case C.TASK_ENTER_EDIT_MODE:
            return {
                ...state,
                editMode: true
            };
        case C.TASK_EXIT_EDIT_MODE:
            return {
                ...state,
                editMode: false
            };
        default:
            return state
    }
};

// Task Collection Reducer
export const tasks = (state = [], action) => {
    switch (action.type) {
        case C.ADD_TASK:
            return [
                ...state,
                task({}, action)
            ];
        case C.SET_TASKS:
            const receivedTasks = action.tasks.map(
                t => ({
                    id: parseInt(t.id, 10),
                    description: t.description,
                    editMode: false
                }));
            return [
                ...receivedTasks
            ];
        case C.EDIT_TASK:
            return state.map(
                t => (t.id === action.taskId) ? task(t, action) : t
            );
        case C.DELETE_TASK :
            return state.filter(
                t => t.id !== action.taskId
            );
        case C.TASK_ENTER_EDIT_MODE:
            return state.map(
                t => (t.id === action.task_id) ? task(t, action) : t
            );
        case C.TASK_EXIT_EDIT_MODE:
            return state.map(
                t => (t.id === action.task_id) ? task(t, action) : t
            );
        default:
            return state
    }
};

// Single BucketList Reducer
export const bucketlist = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_TASK:
            return {
                ...state,
                tasks: tasks(state.tasks, action)
            };
        case C.SET_TASKS:
            return {
                ...state,
                tasks: tasks([], action)
            };
        case C.EDIT_TASK:
            return {
                ...state,
                tasks: tasks(state.tasks, action)
            };
        case C.DELETE_TASK:
            return {
                ...state,
                tasks: tasks(state.tasks, action)
            };
        case C.ADD_BUCKETLIST:
            return {
                id: parseInt(action.bucketId, 10),
                name: action.name,
                tasks: [],
                editMode: false
            };
        case C.EDIT_BUCKETIST:
            return {
                ...state,
                name: action.newName
            };
        case C.BUCKET_ENTER_EDIT_MODE:
            return {
                ...state,
                editMode: true
            };
        case C.BUCKET_EXIT_EDIT_MODE:
            return {
                ...state,
                editMode: false
            };
        case C.TASK_ENTER_EDIT_MODE:
            return {
                ...state,
                tasks: tasks(state.tasks, action)
            };
        case C.TASK_EXIT_EDIT_MODE:
            return {
                ...state,
                tasks: tasks(state.tasks, action)
            };
        default:
            return state
    }
};

// BucketLists Collection Reducer
export const bucketlists = (state = [], action) => {
    switch (action.type) {
        case C.ADD_TASK:
            return state.map(
                b => (b.id === action.bucketId) ? bucketlist(b, action) : b
            );
        case C.SET_TASKS:
            return state.map(
                b => (b.id === action.bucketId) ? bucketlist(b, action) : b
            );
        case C.DELETE_TASK:
            return state.map(
                b => (b.id === action.bucketId) ? bucketlist(b, action) : b
            );
        case C.EDIT_TASK:
            return state.map(
                b => (b.id === action.bucketId) ? bucketlist(b, action) : b
            );
        case C.EDIT_BUCKETIST:
            return state.map(
                b => (b.id === action.bucketId) ? bucketlist(b, action) : b
            );
        case C.ADD_BUCKETLIST:
            return [
                ...state,
                bucketlist({}, action)
            ];
        case C.SET_BUCKETLISTS:
            const receivedBuckets = action.bucketlists.map(
                b => ({
                    id: parseInt(b.id, 10),
                    name: b.name,
                    tasks: tasks([], {type: C.SET_TASKS, tasks: b.tasks}),
                    editMode: false
                }));
            return [
                ...receivedBuckets
            ];
        case C.APPEND_BUCKETLISTS:
            const moreBuckets = action.bucketlists.map(
                b => ({
                    id: parseInt(b.id, 10),
                    name: b.name,
                    tasks: b.tasks,
                    editMode: false
                }));
            return [
                ...state,
                ...moreBuckets
            ];
        case C.DELETE_ALL_BUCKETLISTS:
            return [];
        case C.DELETE_BUCKETLIST:
            return state.filter(
                b => b.id !== action.bucketId
            );
        case C.BUCKET_ENTER_EDIT_MODE:
            return state.map(
                b => (b.id === action.bucket_id) ? bucketlist(b, action) : b
            );
        case C.BUCKET_EXIT_EDIT_MODE:
            return state.map(
                b => (b.id === action.bucket_id) ? bucketlist(b, action) : b
            );
        case C.TASK_ENTER_EDIT_MODE:
            return state.map(
                b => (b.id === action.bucket_id) ? bucketlist(b, action) : b
            );
        case C.TASK_EXIT_EDIT_MODE:
            return state.map(
                b => (b.id === action.bucket_id) ? bucketlist(b, action) : b
            );
        default:
            return state
    }
};

// Single User Reducer
export const user = (state = {}, action) => {
    switch (action.type) {

        case C.ADD_USER:
            return {
                username: action.username,
                password: action.password
            };
        case C.REMOVE_USER:
            return {};
        default:
            return state
    }
};

// Searched BucketLists Reducer
export const searchedBucketLists = (state = [], action) => {
    switch (action.type) {
        case C.ADD_SEARCHED_BUCKETLISTS:
            const receivedBuckets = action.bucketlists.map(
                b => ({
                    id: parseInt(b.id, 10),
                    name: b.name,
                    tasks: b.tasks
                }));
            return [
                ...receivedBuckets
            ];
        case C.DELETE_ALL_SEARCHED_BUCKETLISTS:
            return [];
        default:
            return state
    }
};

// Notifications Reducer
export const notifications = (state = [], action) => {
    switch (action.type) {
        case C.ADD_NOTIFICATION:
            return [
                ...state,
                action.notification
            ];
        case C.CLEAR_NOTIFICATIONS:
            return [];
        default:
            return state
    }
};

// Pagination Counter Reducer
export const bucketPaginator = (state = {page: 1, hasNextPage: false}, action) => {
    switch (action.type) {
        case C.SET_CURRENT_PAGE:
            return {
                ...state,
                page: action.currentPage
            };
        case C.HAS_NEXT_PAGE:
            return {
                ...state,
                hasNextPage: action.hasNextPage
            };
        case C.RESET_PAGE_COUNTER:
            return {
                ...state,
                page: 1
            };
        default:
            return state
    }
};
