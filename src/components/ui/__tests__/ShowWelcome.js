import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowWelcome from "../ShowWelcome";

Enzyme.configure({adapter: new Adapter()});

function setupLoggedOutUser() {
    const props = {
        user: {},
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowWelcome {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupLoggedInUser() {
    const props = {
        user: {username: "user", password: "test"},
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowWelcome {...props} />);

    return {
        props,
        enzymeWrapper
    }
}


describe("<ShowWelcome /> for logged out user", () => {

    it("should render self", () => {
        const {enzymeWrapper} = setupLoggedOutUser();

        expect(enzymeWrapper.find(".jumbotron").length).toEqual(1);
        expect(enzymeWrapper.find("h1").text()).toBe("Plan for the future today with Bucky!");
    });

    it("should not automatically redirect to bucket-lists page on mount", () => {
        const {props} = setupLoggedOutUser();

        expect(props.history.push.calledOnce).toEqual(false);
    });

    it("should attempt to redirect to register page when link is clicked", () => {
        const {enzymeWrapper, props} = setupLoggedOutUser();

        enzymeWrapper.find("a.btn-success").simulate("click");
        expect(props.history.push.calledOnce).toEqual(true);
    });

});

describe("<ShowWelcome /> for logged in user", () => {

    it("should automatically redirect to bucket-lists page on mount", () => {
        const {props} = setupLoggedInUser();

        expect(props.history.push.calledOnce).toEqual(true);
    });

});