import App from "../App";

import React from "react";
import {Provider} from "react-redux"
import {MemoryRouter} from "react-router-dom";
import Enzyme, {mount} from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import {createMockStore} from "redux-test-utils";


Enzyme.configure({adapter: new Adapter()});


describe("<App />", () => {

    const loggedOutState = {
        user: {},
        bucketlists: [],
        searchedBucketLists: [],
        notifications: []
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
        expect(wrapperLoginRoute.find("button").text()).toBe("LOGIN");
        expect(wrapperLoginRoute.find("p").text()).toBe("New User? Click here to register");
    });

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
        expect(wrapperRegisterRoute.find("button").text()).toBe("REGISTER");
        expect(wrapperRegisterRoute.find("p").text()).toBe("Already a User? Click here to login");
    });

});

