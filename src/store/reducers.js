import C from "../constants"

// Single Task Reducer
export const task = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_TASK:
            return {
                id: action.taskId,
                description: action.description
            };
        case C.EDIT_TASK:
            return {
                ...state,
                description: action.newDescription
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
                    id: t.id,
                    description: t.description
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
                id: action.bucketId,
                name: action.name,
                tasks: []
            };
        case C.EDIT_BUCKETIST:
            return {
                ...state,
                name: action.newName
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
                    id: b.id,
                    name: b.name,
                    tasks: b.tasks
                }));
            return [
                ...receivedBuckets
            ];
        case C.APPEND_BUCKETLISTS:
            const moreBuckets = action.bucketlists.map(
                b => ({
                    id: b.id,
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
                    id: b.id,
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
