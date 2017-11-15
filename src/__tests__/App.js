import App from "../App";

import React from "react";
import {Provider} from "react-redux"
import {MemoryRouter} from "react-router-dom";
import Enzyme, {mount} from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import {createMockStore} from "redux-test-utils";


Enzyme.configure({adapter: new Adapter()});


describe("<App />", () => {

    // <App /> can render login page
    const loggedOutState = {
        user: {},
        bucketlists: [],
        searchedBucketLists: [],
        notifications: ["a notification"]
    };

    const store = createMockStore(loggedOutState);

    const wrapperLoginRoute = mount(
        <MemoryRouter initialEntries={["/login"]} initialIndex={0}>
            <Provider store={store}>
                <App />
            </Provider>
        </MemoryRouter>
    );


    it("renders login page", () => {
        expect(wrapperLoginRoute.find(".page-header").length).toEqual(1);
        expect(wrapperLoginRoute.find("form").length).toEqual(1);
        expect(wrapperLoginRoute.find("form>button").text()).toBe("LOGIN");
        expect(wrapperLoginRoute.find("p").text()).toBe("New User? Click here to register");
        expect(wrapperLoginRoute.find(".alert").length).toEqual(1);

    });

    // <App /> can render register page
    const wrapperRegisterRoute = mount(
        <MemoryRouter initialEntries={["/register"]} initialIndex={0}>
            <Provider store={store}>
                <App />
            </Provider>
        </MemoryRouter>
    );

    it("renders register page", () => {
        expect(wrapperRegisterRoute.find(".page-header").length).toEqual(1);
        expect(wrapperRegisterRoute.find("form").length).toEqual(1);
        expect(wrapperRegisterRoute.find("form>button").text()).toBe("REGISTER");
        expect(wrapperRegisterRoute.find("p").text()).toBe("Already a User? Click here to login");
        expect(wrapperRegisterRoute.find(".alert").length).toEqual(1);
    });

});

