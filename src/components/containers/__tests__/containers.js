import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import {createMockStore} from "redux-test-utils";
import {
    BucketLists, BucketName, LoginPage, LogoutPage, NewBucketList, NewTask, Notifications, SearchBucketList,
    SearchedBucketLists, Tasks,
    WelcomePage
} from "../containers";
import AddBucketForm from "../../ui/AddBucketForm";
import {MemoryRouter} from "react-router-dom";
import ShowWelcome from "../../ui/ShowWelcome";
import ShowLogin from "../../ui/ShowLogin";
import ShowNotifications from "../../ui/ShowNotifications";
import ShowBuckets from "../../ui/ShowBuckets";
import ShowBucketName from "../../ui/ShowBucketName";
import AddTaskForm from "../../ui/AddTaskForm";
import ShowTasks from "../../ui/ShowTasks";
import ShowLogout from "../../ui/ShowLogout";
import ShowSearchBucketForm from "../../ui/ShowSearchBucketForm";
import ShowSearchedBuckets from "../../ui/ShowSearchedBuckets";


Enzyme.configure({adapter: new Adapter()});


const shallowWithStore = (component, store) => {
    const context = {
        store,
    };
    return shallow(component, {context});
};


describe("<NewBucketList />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            user: {username: "user", password: "test"}
        };
        const store = createMockStore(testState);
        const wrapper = shallowWithStore(<NewBucketList/>, store);
        expect(wrapper.find(AddBucketForm).length).toEqual(1);
    });
});

describe("<Notifications />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            notifications: []
        };
        const store = createMockStore(testState);
        const wrapper = shallowWithStore(<Notifications/>, store);
        expect(wrapper.find(ShowNotifications).length).toEqual(1);
    });
});

describe("<WelcomePage />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            user: {username: "user", password: "test"}
        };
        const store = createMockStore(testState);
        const wrapper = shallow(
            <MemoryRouter initialEntries={["/"]}>
                <WelcomePage store={store} history={history}/>
            </MemoryRouter>
        );
        expect(wrapper.dive().dive().find(ShowWelcome).length).toEqual(1);
    })
});

describe("<LoginPage />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            user: {username: "user", password: "test"}
        };
        const store = createMockStore(testState);
        const wrapper = shallow(
            <MemoryRouter initialEntries={["/login"]}>
                <LoginPage store={store} history={history}/>
            </MemoryRouter>
        );
        expect(wrapper.dive().dive().find(ShowLogin).length).toEqual(1);
    })
});


describe("<BucketLists />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            user: {username: "user", password: "test"},
            bucketlists: [],
            bucketPaginator: {page: 1, hasNextPage: false}
        };
        const store = createMockStore(testState);
        const wrapper = shallow(
            <MemoryRouter initialEntries={["/bucketlists"]}>
                <BucketLists store={store} history={history}/>
            </MemoryRouter>
        );
        expect(wrapper.dive().dive().find(ShowBuckets).length).toEqual(1);
    })
});

describe("<BucketName />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            bucketId: 1,
            bucketlists: [{id: 1, name: "buck", tasks: [], editMode: false}]
        };
        const store = createMockStore(testState);
        const match = {params: {id: 1}};
        const wrapper = shallow(
            <MemoryRouter initialEntries={["/bucketlists/1/tasks"]}>
                <BucketName store={store} match={match}/>
            </MemoryRouter>
        );
        expect(wrapper.dive().dive().find(ShowBucketName).length).toEqual(1);
    })
});

describe("<NewTask />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            bucketId: 1,
            user: {username: "user", password: "test"},
        };
        const store = createMockStore(testState);
        const match = {params: {id: 1}};
        const wrapper = shallow(
            <MemoryRouter initialEntries={["/bucketlists/1/tasks"]}>
                <NewTask store={store} match={match}/>
            </MemoryRouter>
        );
        expect(wrapper.dive().dive().find(AddTaskForm).length).toEqual(1);
    })
});

describe("<Tasks />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            user: {username: "user", password: "test"},
            bucketlists: [{
                id: 1,
                name: "bucket 1",
                tasks: [
                    {id: 1, description: "task 1", editMode: false},
                    {id: 2, description: "task 2", editMode: false}
                ],
                editMode: false
            }],
            bucketId: 1
        };
        const store = createMockStore(testState);
        const match = {params: {id: 1}};

        const wrapper = shallow(
            <MemoryRouter initialEntries={["/bucketlists/1/tasks"]}>
                <Tasks store={store} history={history} match={match}/>
            </MemoryRouter>
        );
        expect(wrapper.dive().dive().find(ShowTasks).length).toEqual(1);
    })
});

describe("<LogoutPage />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            user: {username: "user", password: "test"},
        };
        const store = createMockStore(testState);
        const wrapper = shallow(
            <MemoryRouter initialEntries={["/logout"]}>
                <LogoutPage store={store} history={history}/>
            </MemoryRouter>
        );
        expect(wrapper.dive().dive().find(ShowLogout).length).toEqual(1);
    })
});


describe("<SearchBucketList />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            user: {username: "user", password: "test"},
        };
        const store = createMockStore(testState);
        const wrapper = shallow(
            <MemoryRouter initialEntries={["/bucketlists/search"]}>
                <SearchBucketList store={store} history={history}/>
            </MemoryRouter>
        );
        expect(wrapper.dive().dive().find(ShowSearchBucketForm).length).toEqual(1);
    })
});

describe("<SearchedBucketLists />", () => {
    it("should render self and sub-components successfully", () => {
        const testState = {
            user: {username: "user", password: "test"},
            searchedBucketLists: []
        };
        const store = createMockStore(testState);
        const wrapper = shallow(
            <MemoryRouter initialEntries={["/bucketlists/search"]}>
                <SearchedBucketLists store={store} history={history}/>
            </MemoryRouter>
        );
        expect(wrapper.dive().dive().find(ShowSearchedBuckets).length).toEqual(1);
    })
});