import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {loginUser, registerUser} from "../actions";
import C from "../constants";

// API endpoints
const USERENDPOINT = "/api/v1.0/auth/users/";
const BUCKETLISTENDPOINT = "/api/v1.0/bucketlists/";


// for mocking axios calls
const mockAxios = new MockAdapter(axios);

// setup redux store that handles async API calls
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Async actions', () => {
    afterEach(() => {
        mockAxios.reset(); // reset mocking behaviour
    });

    it('registerUser creates ADD_USER action when registration is successful', () => {

        mockAxios.onPost(USERENDPOINT,
            {
                data: {
                    username: 'user',
                    password: 'test'
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

    it('registerUser creates ADD_NOTIFICATION action when username already exists', () => {

        mockAxios.onPost(USERENDPOINT,
            {
                data: {
                    username: 'user',
                    password: 'test'
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

    it('addUser creates ADD_USER action when login is successful', () => {

        mockAxios.onGet(BUCKETLISTENDPOINT,
            {
                data: {
                    username: 'user',
                    password: 'test'
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
    })
});
