import {
    bucketlist, bucketlists, bucketPaginator, notifications, isRegistered, searchedBucketLists, task, tasks,
    user
} from "../reducers";

describe("User Reducer", () => {

    it("ADD_USER dispatched successfully", () => {
        const state = {};
        const action = {
            type: "ADD_USER",
            username: "user1",
            password: "pass"
        };
        const result = user(state, action);
        expect(result)
            .toEqual({username: "user1", password: "pass"})
    });

    it("REMOVE_USER dispatched successfully", () => {
        const state = {username: "user1", password: "pass"};
        const action = {
            type: "REMOVE_USER"
        };
        const result = user(state, action);
        expect(result)
            .toEqual({})

    });

    it("Unknown action does not change state", () => {
        const state = {};
        const action = {
            type: "WRONG",
            username: "namey",
            password: "pass"
        };
        const result = user(state, action);
        expect(result)
            .toEqual({})
    })

});

describe("Bucketlist Reducer", () => {

    it("ADD_BUCKETLIST dispatched successfully", () => {
        const state = {};
        const action = {
            type: "ADD_BUCKETLIST",
            bucketId: 1,
            name: "bucket 1"
        };
        const result = bucketlist(state, action);
        expect(result)
            .toEqual({id: 1, name: "bucket 1", tasks: [], editMode: false})
    });

    it("ADD_TASK dispatched successfully", () => {
        const state = {
            id: 1,
            name: "bucket 1",
            tasks: [],
            editMode: false
        };
        const action = {
            type: "ADD_TASK",
            bucketId: 1,
            taskId: 1,
            description: "task 1"
        };
        const result = bucketlist(state, action);
        expect(result)
            .toEqual({
                id: 1,
                name: "bucket 1",
                tasks: [
                    {
                        id: 1,
                        description: "task 1",
                        editMode: false
                    }
                ],
                editMode: false
            })
    });

    it("SET_TASKS dispatched successfully", () => {
        const state = {
            id: 1,
            name: "bucket 1",
            tasks: [],
            editMode: false
        };
        const action = {
            type: "SET_TASKS",
            tasks: [
                {id: 1, description: "task 1"},
                {id: 2, description: "task 2"}
            ]
        };
        const result = bucketlist(state, action);
        expect(result)
            .toEqual({
                id: 1, name: "bucket 1", tasks: [
                    {id: 1, description: "task 1", editMode: false},
                    {id: 2, description: "task 2", editMode: false}
                ],
                editMode: false
            });
    });

    it("DELETE_TASK dispatched successfully", () => {
        const state = {
            id: 1,
            name: "bucket 1",
            tasks: [
                {id: 1, description: "task 1", editMode: false},
                {id: 2, description: "task 2", editMode: false}
            ],
            editMode: false
        };
        const action = {
            type: "DELETE_TASK",
            bucketId: 1,
            taskId: 1
        };
        const result = bucketlist(state, action);
        expect(result)
            .toEqual({
                id: 1,
                name: "bucket 1",
                tasks: [
                    {id: 2, description: "task 2", editMode: false}
                ],
                editMode: false
            })
    });

    it("Unknown action does not change state", () => {
        const state = {};
        const action = {
            type: "WRONG",
            bucketId: 1,
            name: "bucket 1"
        };
        const result = bucketlist(state, action);
        expect(result)
            .toEqual({})
    })
});

describe("Task Reducer", () => {

    it("ADD_TASK dispatched successfully", () => {
        const state = {};
        const action = {
            type: "ADD_TASK",
            taskId: 1,
            description: "task 1"
        };
        const result = task(state, action);
        expect(result)
            .toEqual({id: 1, description: "task 1", editMode: false})
    });

    it("Unknown action does not change state", () => {
        const state = {};
        const action = {
            type: "WRONG",
            taskId: 1,
            description: "task 1"
        };
        const result = task(state, action);
        expect(result)
            .toEqual({})
    })
});

describe("Bucketlists Reducer", () => {

    it("ADD_TASK dispatched successfully", () => {
        const state = [{
            id: 1,
            name: "bucket 1",
            tasks: [],
            editMode: false
        }];
        const action = {
            type: "ADD_TASK",
            bucketId: 1,
            taskId: 1,
            description: "task 1"
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([{
                id: 1,
                name: "bucket 1",
                tasks: [
                    {
                        id: 1,
                        description: "task 1",
                        editMode: false
                    }
                ],
                editMode: false
            }])
    });

    it("SET_TASKS dispatched successfully", () => {
        const state = [
            {
                id: 1,
                name: "bucket 1",
                tasks: [],
                editMode: false
            },
            {
                id: 2,
                name: "bucket 2",
                tasks: [],
                editMode: false
            }
        ];
        const action = {
            type: "SET_TASKS",
            bucketId: 1,
            tasks: [
                {id: 1, description: "task 1", editMode: false},
                {id: 2, description: "task 2", editMode: false}
            ],
            editMode: false
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {
                    id: 1,
                    name: "bucket 1",
                    tasks: [
                        {id: 1, description: "task 1", editMode: false},
                        {id: 2, description: "task 2", editMode: false}
                    ],
                    editMode: false
                }, {
                    id: 2,
                    name: "bucket 2",
                    tasks: [],
                    editMode: false
                }
            ]);
    });

    it("DELETE_TASK dispatched successfully", () => {
        const state = [{
            id: 1,
            name: "bucket 1",
            tasks: [
                {id: 1, description: "task 1", editMode: false},
                {id: 2, description: "task 2", editMode: false}
            ],
            editMode: false
        }];
        const action = {
            type: "DELETE_TASK",
            bucketId: 1,
            taskId: 1
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([{
                id: 1,
                name: "bucket 1",
                tasks: [
                    {id: 2, description: "task 2", editMode: false}
                ],
                editMode: false
            }])
    });

    it("ADD_BUCKETLIST dispatched successfully", () => {
        const state = [];
        const action = {
            type: "ADD_BUCKETLIST",
            bucketId: 1,
            name: "bucket 1"
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([{id: 1, name: "bucket 1", tasks: [], editMode: false}])
    });

    it("SET_BUCKETLISTS dispatched successfully", () => {
        const state = [];
        const action = {
            type: "SET_BUCKETLISTS",
            bucketlists: [
                {id: 1, name: "1", tasks: []},
                {
                    id: 2, name: "5", tasks: [{id: 1, description: "7"}
                ]
                }]
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "1", tasks: [], editMode: false},
                {id: 2, name: "5", tasks: [{id: 1, description: "7", editMode: false}], editMode: false}
            ])
    });

    it("APPEND_BUCKETLISTS dispatched successfully", () => {
        const state = [{id: 1, name: "1", tasks: [], editMode: false}];
        const action = {
            type: "APPEND_BUCKETLISTS",
            bucketlists: [
                {id: 3, name: "3", tasks: []},
                {
                    id: 2, name: "2", tasks: []
                }]
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "1", tasks: [], editMode: false},
                {id: 3, name: "3", tasks: [], editMode: false},
                {id: 2, name: "2", tasks: [], editMode: false}
            ])
    });

    it("DELETE_ALL_BUCKETLISTS dispatched successfully", () => {
        const state = [
            {id: 1, name: "1", tasks: [], editMode: false},
            {id: 2, name: "5", tasks: [{id: 1, description: "7", editMode: false}], editMode: false}
        ];
        const action = {
            type: "DELETE_ALL_BUCKETLISTS",
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([])
    });

    it("DELETE_BUCKETLIST dispatched successfully", () => {
        const state = [
            {id: 1, name: "1", tasks: [], editMode: false},
            {id: 2, name: "5", tasks: [{id: 1, description: "7", editMode: false}], editMode: false}
        ];
        const action = {
            type: "DELETE_BUCKETLIST",
            bucketId: 2
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "1", tasks: [], editMode: false}
            ])
    });

    it("EDIT_BUCKETLIST dispatched successfully", () => {
        const state = [
            {id: 1, name: "1", tasks: [], editMode: false}
        ];
        const action = {
            type: "EDIT_BUCKETLIST",
            bucketId: 1,
            newName: "one"
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "one", tasks: [], editMode: false}
            ])
    });

    it("EDIT_TASK dispatched successfully", () => {
        const state = [
            {id: 1, name: "1", tasks: [{id: 1, description: "7", editMode: false}], editMode: false}
        ];
        const action = {
            type: "EDIT_TASK",
            bucketId: 1,
            taskId: 1,
            newDescription: "one"
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "1", tasks: [{id: 1, description: "one", editMode: false}], editMode: false}
            ])
    });

    it("BUCKET_ENTER_EDIT_MODE success", () => {
        const state = [
            {id: 1, name: "1", tasks: [], editMode: false}
        ];
        const action = {
            type: "BUCKET_ENTER_EDIT_MODE",
            bucketId: 1
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "1", tasks: [], editMode: true}
            ])
    });

    it("BUCKET_ENTER_EXIT_MODE success", () => {
        const state = [
            {id: 1, name: "1", tasks: [], editMode: true}
        ];
        const action = {
            type: "BUCKET_EXIT_EDIT_MODE",
            bucketId: 1
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "1", tasks: [], editMode: false}
            ])
    });

    it("TASK_ENTER_EDIT_MODE success", () => {
        const state = [
            {id: 1, name: "1", tasks: [{id: 1, description: "7", editMode: false}], editMode: false}
        ];
        const action = {
            type: "TASK_ENTER_EDIT_MODE",
            bucketId: 1,
            taskId: 1
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "1", tasks: [{id: 1, description: "7", editMode: true}], editMode: false}
            ])
    });

    it("TASK_ENTER_EXIT_MODE success", () => {
        const state = [
            {id: 1, name: "1", tasks: [{id: 1, description: "7", editMode: true}], editMode: false}
        ];
        const action = {
            type: "TASK_EXIT_EDIT_MODE",
            bucketId: 1,
            taskId: 1
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "1", tasks: [{id: 1, description: "7", editMode: false}], editMode: false}
            ])
    });

    it("Unknown action does not change state", () => {
        const state = [];
        const action = {
            type: "WRONG",
            bucketId: 1,
            name: "bucket 1"
        };
        const result = bucketlists(state, action);
        expect(result)
            .toEqual([])
    })
});

describe("Searched Bucketlists Reducer", () => {


    it("ADD_SEARCHED_BUCKETLISTS dispatched successfully", () => {
        const state = [];
        const action = {
            type: "ADD_SEARCHED_BUCKETLISTS",
            bucketlists: [
                {id: 1, name: "1", tasks: []},
                {
                    id: 2, name: "5", tasks: [{id: 1, description: "7"}
                ]
                }]
        };
        const result = searchedBucketLists(state, action);
        expect(result)
            .toEqual([
                {id: 1, name: "1", tasks: []},
                {id: 2, name: "5", tasks: [{id: 1, description: "7"}]}
            ])
    });

    it("DELETE_ALL_SEARCHED_BUCKETLISTS success", () => {
        const state = [
            {id: 1, name: "1", tasks: []},
            {id: 2, name: "5", tasks: [{id: 1, description: "7"}]}
        ];
        const action = {
            type: "DELETE_ALL_SEARCHED_BUCKETLISTS",
        };
        const result = searchedBucketLists(state, action);
        expect(result)
            .toEqual([])
    });

    it("Unknown action does not change state", () => {
        const state = {};
        const action = {
            type: "WRONG",
            bucketId: 1,
            name: "bucket 1"
        };
        const result = searchedBucketLists(state, action);
        expect(result)
            .toEqual({})
    })
});

describe("Tasks Reducer", () => {

    it("ADD_TASK dispatched successfully", () => {
        const state = [];
        const action = {
            type: "ADD_TASK",
            taskId: 1,
            description: "task 1"
        };
        const result = tasks(state, action);
        expect(result)
            .toEqual([{id: 1, description: "task 1", editMode: false}])
    });

    it("SET_TASKS dispatched successfully", () => {
        const state = [];
        const action = {
            type: "SET_TASKS",
            tasks: [
                {id: 1, description: "task 1"},
                {id: 2, description: "task 2"}
            ]
        };
        const result = tasks(state, action);
        expect(result)
            .toEqual([
                {id: 1, description: "task 1", editMode: false},
                {id: 2, description: "task 2", editMode: false}
            ])
    });

    it("DELETE_TASK dispatched successfully", () => {
        const state = [
            {id: 1, description: "task 1", editMode: false},
            {id: 3, description: "task 3", editMode: false}
        ];
        const action = {
            type: "DELETE_TASK",
            taskId: 1
        };
        const result = tasks(state, action);
        expect(result)
            .toEqual([
                {id: 3, description: "task 3", editMode: false}
            ])
    });

    it("Unknown action dispatched successfully", () => {
        const state = [
            {id: 1, description: "task 1", editMode: false},
            {id: 3, description: "task 3", editMode: false}
        ];
        const action = {
            type: "unknown"
        };
        const result = tasks(state, action);
        expect(result)
            .toEqual([
                {id: 1, description: "task 1", editMode: false},
                {id: 3, description: "task 3", editMode: false}
            ])
    });
});

describe("Notifications Reducer", () => {

    it("ADD_NOTIFICATION dispatched successfully", () => {
        const state = [];
        const action = {
            type: "ADD_NOTIFICATION",
            notification: "Error 404"
        };
        const result = notifications(state, action);
        expect(result)
            .toEqual(["Error 404"])
    });

    it("CLEAR_NOTIFICATIONS dispatched successfully", () => {
        const state = ["Error 500", "Error 404"];
        const action = {
            type: "CLEAR_NOTIFICATIONS"
        };
        const result = notifications(state, action);
        expect(result)
            .toEqual([])
    });

    it("Unknown action does not change state", () => {
        const state = ["Error 404"];
        const action = {
            type: "unknown"
        };
        const result = notifications(state, action);
        expect(result)
            .toEqual(["Error 404"])
    });
});

describe("Bucket Paginator Reducer", () => {

    it("SET_CURRENT_PAGE dispatched successfully", () => {
        const state = {page: 1, hasNextPage: false};
        const action = {
            type: "SET_CURRENT_PAGE",
            currentPage: 2
        };
        const result = bucketPaginator(state, action);
        expect(result)
            .toEqual({page: 2, hasNextPage: false})
    });

    it("HAS_NEXT_PAGE dispatched successfully", () => {
        const state = {page: 1, hasNextPage: false};
        const action = {
            type: "HAS_NEXT_PAGE",
            hasNextPage: true
        };
        const result = bucketPaginator(state, action);
        expect(result)
            .toEqual({page: 1, hasNextPage: true})
    });

    it("RESET_PAGE_COUNTER dispatched successfully", () => {
        const state = {page: 4, hasNextPage: false};
        const action = {
            type: "RESET_PAGE_COUNTER"
        };
        const result = bucketPaginator(state, action);
        expect(result)
            .toEqual({page: 1, hasNextPage: false})
    });

    it("Unknown action does not change state", () => {
        const state = {page: 4, hasNextPage: false};
        const action = {
            type: "unknown action"
        };
        const result = bucketPaginator(state, action);
        expect(result)
            .toEqual({page: 4, hasNextPage: false})
    });
});