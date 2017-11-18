import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {
    addBucketList, deleteBucketList, deleteTask, editBucketList, editTask, fetchBucketLists, fetchBucketListsPage,
    fetchSearchedBucketLists, fetchTasks, loginUser,
    registerUser
} from "../actions";
import C from "../../../constants";

// API endpoints
const USERENDPOINT = "/api/v1.0/auth/users/";
const BUCKETLISTENDPOINT = "/api/v1.0/bucketlists/";


// for mocking axios calls
const mockAxios = new MockAdapter(axios);

// setup redux store that handles async API calls
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe("Async actions", () => {
    afterEach(() => {
        mockAxios.reset(); // reset mocking behaviour
    });

    it("registerUser creates ADD_USER action when registration is successful", () => {

        mockAxios.onPost(USERENDPOINT,
            {
                data: {
                    username: "user",
                    password: "test"
                }
            })
            .reply(201);

        const expectedActions = [
            {
                type: C.ADD_USER,
                username: "user",
                password: "test"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(registerUser("user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });

    });

    it("registerUser creates ADD_NOTIFICATION action when username already exists", () => {

        mockAxios.onPost(USERENDPOINT,
            {
                data: {
                    username: "user",
                    password: "test"
                }
            })
            .reply(409);

        const expectedActions = [
            {

                type: C.ADD_NOTIFICATION,
                notification: "This username already exists!"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(registerUser("user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });

    });

    it("loginUser creates ADD_USER action when login is successful", () => {

        mockAxios.onGet(BUCKETLISTENDPOINT,
            {
                data: {
                    username: "user",
                    password: "test"
                }
            })
            .reply(200);

        const expectedActions = [
            {
                type: C.ADD_USER,
                username: "user",
                password: "test"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(loginUser("user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("loginUser creates ADD_NOTIFICATION action when unauthorized", () => {

        mockAxios.onGet(BUCKETLISTENDPOINT,
            {
                data: {
                    username: "user",
                    password: "test"
                }
            })
            .reply(401);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Incorrect Username or Password"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(loginUser("user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("loginUser creates ADD_NOTIFICATION action when unauthorized", () => {

        mockAxios.onGet(BUCKETLISTENDPOINT,
            {
                data: {
                    username: "user",
                    password: "test"
                }
            })
            .reply(500);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "A problem occured... Try again."
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(loginUser("user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("addBucketList creates ADD_BUCKETLIST action bucket-list successfully created", () => {

        mockAxios.onPost(BUCKETLISTENDPOINT)
            .reply(201, {
                bucketList: {
                    id: 1,
                    name: "buck"
                }
            });

        const expectedActions = [
            {
                type: C.ADD_BUCKETLIST,
                bucketId: 1,
                name: "buck"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(addBucketList("buck", "user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("addBucketList creates ADD_NOTIFICATION action when bucket-list already exists", () => {

        mockAxios.onPost(BUCKETLISTENDPOINT)
            .reply(409);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Bucket-list \"buck\" already exists"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(addBucketList("buck", "user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });

    });

    it("addBucketList creates ADD_NOTIFICATION action when server returns other error", () => {

        mockAxios.onPost(BUCKETLISTENDPOINT)
            .reply(500);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Try again"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(addBucketList("buck", "user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });

    });

    it("deleteBucketList creates DELETE_BUCKETLIST action when successfully deleted", () => {

        mockAxios.onDelete(BUCKETLISTENDPOINT + "1")
            .reply(200);

        const expectedActions = [
            {
                type: C.DELETE_BUCKETLIST,
                bucketId: 1
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(deleteBucketList(1, "user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });

    });

    it("deleteBucketList creates ADD_NOTIFICATION action when bucket-list no longer exists", () => {

        mockAxios.onDelete(BUCKETLISTENDPOINT)
            .reply(404);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Bucket-list no longer exists"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(deleteBucketList(1, "user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });

    });

    it("deleteBucketList creates ADD_NOTIFICATION action when server returns other error", () => {

        mockAxios.onDelete(BUCKETLISTENDPOINT + "1")
            .reply(403);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Try again"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store
            .dispatch(deleteBucketList(1, "user", "test"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });

    });

    it("editBucketList creates EDIT_BUCKETLIST when bucket-list is successfully modified", () => {

        mockAxios.onPatch(BUCKETLISTENDPOINT + "1")
            .reply(200);

        const expectedActions = [
            {
                type: C.EDIT_BUCKETIST,
                bucketId: 1,
                newName: "back 1"
            },
            {
                type: C.BUCKET_EXIT_EDIT_MODE,
                bucketId: 1
            }
        ];

        const state = {
            user: {},
            bucketlists: [{id: 1, name: "buck 1", tasks: [], editMode: false}],
            
            searchedBucketLists: [],
            errors: []
        };

        const store = mockStore(state);

        return store.dispatch(editBucketList(1, "back 1", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it("editBucketList creates ADD_NOTIFICATION when bucket-list no longer exists", () => {

        mockAxios.onPatch(BUCKETLISTENDPOINT + "1")
            .reply(404);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Bucket-list no longer exists"
            }
        ];

        const state = {
            user: {},
            bucketlists: [{id: 1, name: "buck 1", tasks: [], editMode: false}],
            searchedBucketLists: [],
            errors: []
        };

        const store = mockStore(state);

        return store.dispatch(editBucketList(1, "back 1", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it("editBucketList creates ADD_NOTIFICATION when other server error", () => {

        mockAxios.onPatch(BUCKETLISTENDPOINT + "1")
            .reply(500);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Try again"
            }
        ];

        const state = {
            user: {},
            bucketlists: [{id: 1, name: "buck 1", tasks: [], editMode: false}],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(editBucketList(1, "back 1", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("editTask creates EDIT_TASK when task successfully edited", () => {

        mockAxios.onPatch("/api/v1.0/bucketlists/1/tasks/1")
            .reply(200);

        const expectedActions = [
            {
                type: C.EDIT_TASK,
                taskId: 1,
                bucketId: 1,
                newDescription: "new task"
            },
            {
                type: C.TASK_EXIT_EDIT_MODE,
                bucketId: 1,
                taskId: 1
            }
        ];

        const state = {
            user: {},
            bucketlists: [{
                id: 1,
                name: "buck 1",
                tasks: [{id: 1, description: "old task", editMode: false}],
                editMode: false
            }],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(editTask(1, 1, "new task", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("editTask creates ADD_NOTIFICATION when task no longer exists", () => {

        mockAxios.onPatch("/api/v1.0/bucketlists/1/tasks/1")
            .reply(404);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Task does not exist anymore!"
            }
        ];

        const state = {
            user: {},
            bucketlists: [{
                id: 1,
                name: "buck 1",
                tasks: [{id: 1, description: "old task", editMode: false}],
                editMode: false
            }],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(editTask(1, 1, "new task", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("editTask creates ADD_NOTIFICATION when other server error", () => {

        mockAxios.onPatch("/api/v1.0/bucketlists/1/tasks/1")
            .reply(500);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "There was a problem getting your tasks."
            }
        ];

        const state = {
            user: {},
            bucketlists: [{
                id: 1,
                name: "buck 1",
                tasks: [{id: 1, description: "old task", editMode: false}],
                editMode: false
            }],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(editTask(1, 1, "new task", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("deleteTask creates DELETE_TASK when task successfully deleted", () => {

        mockAxios.onDelete(BUCKETLISTENDPOINT + "1/tasks/1")
            .reply(200);

        const expectedActions = [
            {
                type: C.DELETE_TASK,
                taskId: 1,
                bucketId: 1
            }
        ];

        const state = {
            user: {username: "user", password: "test"},
            bucketlists: [{
                id: 1,
                name: "buck 1",
                tasks: [{id: 1, description: "old task", editMode: false}],
                editMode: false
            }],
            
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(deleteTask(1, 1, "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("deleteTask creates ADD_NOTIFICATION when task no longer exists", () => {

        mockAxios.onDelete(BUCKETLISTENDPOINT + "1/tasks/1")
            .reply(404);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Task does not exist anymore!"
            }
        ];

        const state = {
            user: {user: "user", password: "test"},
            bucketlists: [{
                id: 1,
                name: "buck 1",
                tasks: [{id: 1, description: "old task", editMode: false}],
                editMode: false
            }],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(editTask(1, 1, "new task", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("deleteTask creates ADD_NOTIFICATION when other server error", () => {

        mockAxios.onDelete(BUCKETLISTENDPOINT + "1/tasks/1")
            .reply(401);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "There was a problem getting your tasks."
            }
        ];

        const state = {
            user: {username: "user", password: "test"},
            bucketlists: [{
                id: 1,
                name: "buck 1",
                tasks: [{id: 1, description: "old task", editMode: false}],
                editMode: false
            }],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(deleteTask(1, 1, "new task", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });


    it("fetchBucketLists creates SET_BUCKETLISTS when buckets successfully fetched", () => {

        mockAxios.onGet(BUCKETLISTENDPOINT)
            .reply(200, {
                "bucket-lists": [{id: 1, name: "buck", tasks: []}],
                next: true
            });

        const expectedActions = [
            {
                type: C.SET_BUCKETLISTS,
                bucketlists: [
                    {
                        "id": 1,
                        "name": "buck",
                        "tasks": []
                    }]
            },
            {
                type: C.HAS_NEXT_PAGE, hasNextPage: true
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(fetchBucketLists("user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("fetchBucketLists creates ADD_NOTIFICATION when server error", () => {

        mockAxios.onGet("/api/v1.0/bucketlists/")
            .reply(500);

        const expectedActions = [{
            type: C.ADD_NOTIFICATION,
            notification: "There was a problem getting your bucket-lists"
        }];

        const state = {
            user: {},
            bucketlists: [],
            searchedBucketLists: [],
            errors: []
        };

        const store = mockStore(state);

        return store.dispatch(fetchBucketLists("user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });


    it("fetchBucketListPage creates APPEND_BUCKETLISTS when buckets page successfully fetched", () => {

        mockAxios.onGet("/api/v1.0/bucketlists/?page=2")
            .reply(200,
                {
                    "bucket-lists": [{
                        id: 1,
                        name: "buck 1",
                        tasks: [{id: 1, description: "old task", editMode: false}],
                        editMode: false
                    }],
                    next: true
                });

        const expectedActions = [
            {
                type: C.APPEND_BUCKETLISTS,
                bucketlists: [
                    {
                        "editMode": false,
                        "id": 1,
                        "name": "buck 1",
                        "tasks": [{"description": "old task", "editMode": false, "id": 1}]
                    }]
            },
            {
                type: C.HAS_NEXT_PAGE, hasNextPage: true
            },
            {
                type: C.SET_CURRENT_PAGE, currentPage: 2
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            
            searchedBucketLists: [],
            errors: []
        };

        const store = mockStore(state);

        return store.dispatch(fetchBucketListsPage(1, "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("fetchBucketListPage creates ADD_NOTIFICATIONS when server error", () => {

        mockAxios.onGet("/api/v1.0/bucketlists/?page=2")
            .reply(500);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "There was a problem getting your bucket-lists"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(fetchBucketListsPage(1, "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("fetchSearchedBucketLists creates ADD_SEARCHED_BUCKETLISTS when buckets successfully fetched", () => {

        mockAxios.onGet("/api/v1.0/bucketlists/search/buck")
            .reply(200,
                {
                    "bucket-lists": [{
                        id: 1,
                        name: "buck 1",
                        tasks: []
                    }]
                });

        const expectedActions = [
            {
                type: C.ADD_SEARCHED_BUCKETLISTS,
                bucketlists: [
                    {
                        "id": 1,
                        "name": "buck 1",
                        "tasks": []
                    }]
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            
            searchedBucketLists: [],
            errors: []
        };

        const store = mockStore(state);

        return store.dispatch(fetchSearchedBucketLists("buck", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("fetchSearchedBucketLists creates ADD_NOTIFICATION server error", () => {

        mockAxios.onGet("/api/v1.0/bucketlists/search/buck")
            .reply(500);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "Try again."
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(fetchSearchedBucketLists("buck", "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("fetchTasks creates SET_TASKS when tasks successfully fetched", () => {

        mockAxios.onGet("/api/v1.0/bucketlists/1/tasks/")
            .reply(200,
                {
                    "tasks": [{
                        id: 1,
                        description: "task 1"
                    }]
                });

        const expectedActions = [
            {
                type: C.SET_TASKS,
                bucketId: 1,
                tasks: [
                    {
                        "id": 1,
                        "description": "task 1",
                    }]
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(fetchTasks(1, "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("fetchTasks creates SET_TASKS when tasks not found", () => {

        mockAxios.onGet("/api/v1.0/bucketlists/1/tasks/")
            .reply(404);

        const expectedActions = [
            {
                type: C.SET_TASKS,
                bucketId: 1,
                tasks: []
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(fetchTasks(1, "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it("fetchTasks creates ADD_NOTIFICATION when other server error", () => {

        mockAxios.onGet("/api/v1.0/bucketlists/1/tasks/")
            .reply(500);

        const expectedActions = [
            {
                type: C.ADD_NOTIFICATION,
                notification: "There was a problem getting your tasks"
            }
        ];

        const state = {
            user: {},
            bucketlists: [],
            
            searchedBucketLists: [],
            notifications: []
        };

        const store = mockStore(state);

        return store.dispatch(fetchTasks(1, "user", "test")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

});
