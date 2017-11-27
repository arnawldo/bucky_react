import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowLogout from "../ShowLogout";

Enzyme.configure({adapter: new Adapter()});

function setupLoggedInUser() {
    const props = {
        onClearBuckets: sinon.spy(),
        onClearUser: sinon.spy(),
        user: {username: "tester", password: "test"},
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowLogout{...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupLoggedOutUser() {
    const props = {
        onClearBuckets: sinon.spy(),
        onClearUser: sinon.spy(),
        user: {},
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowLogout{...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowLogout /> for logged in user", () => {

    it("should clear user and bucket-lists from store on logout", () => {
        const {props} = setupLoggedInUser();

        expect(props.onClearBuckets.calledOnce).toEqual(true);
        expect(props.onClearUser.calledOnce).toEqual(true);

    });

    it("should redirect on logout", () => {
        const {props} = setupLoggedInUser();

        expect(props.history.push.calledOnce).toEqual(true);

    })
});

describe("<ShowLogout/> for logged out user", () => {

    it("should not clear user and bucket-lists from store on logout", () => {
        const {props} = setupLoggedOutUser();

        expect(props.onClearBuckets.calledOnce).toEqual(false);
        expect(props.onClearUser.calledOnce).toEqual(false);

    });

    it("should redirect on logout", () => {
        const {props} = setupLoggedOutUser();

        expect(props.history.push.calledOnce).toEqual(true);

    })
});

