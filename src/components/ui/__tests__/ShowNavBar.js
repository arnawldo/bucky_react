import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowNavBar from "../ShowNavBar";

Enzyme.configure({adapter: new Adapter()});


function setupWithUser() {
    const props = {
        user: {username: "user", password: "pass"},
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowNavBar {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupWithNoUser() {
    const props = {
        user: {},
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowNavBar {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowNavBar /> with user ", () => {

    it("should render self and subcomponents", () => {
        const {enzymeWrapper} = setupWithUser();

        expect(enzymeWrapper.find("nav.navbar-inverse").length).toEqual(1);
        expect(enzymeWrapper.find("div.container-fluid").length).toEqual(1);
        expect(enzymeWrapper.find(".navbar-brand").length).toEqual(1);
        expect(enzymeWrapper.find(".glyphicon-home").length).toEqual(1);
        expect(enzymeWrapper.find('.glyphicon-search').length).toEqual(1);
        expect(enzymeWrapper.find(".glyphicon-log-out").length).toEqual(1);
        expect(enzymeWrapper.find(".glyphicon-log-in").length).toEqual(0);
    });

    it("should redirect when Home clicked", () => {

        const {enzymeWrapper, props} = setupWithUser();

        enzymeWrapper.find(".glyphicon-home").simulate("click");
        expect(props.history.push.calledOnce).toEqual(true);
    });

    it('should redirect when Search clicked', () => {

        const {enzymeWrapper, props} = setupWithUser();

        enzymeWrapper.find('.glyphicon-search').simulate('click');
        expect(props.history.push.calledOnce).toEqual(true);
    });

    it("should redirect when Brand Name clicked", () => {

        const {enzymeWrapper, props} = setupWithUser();

        enzymeWrapper.find(".navbar-brand").simulate("click");
        expect(props.history.push.calledOnce).toEqual(true);
    });

    it("should redirect when Logout clicked", () => {

        const {enzymeWrapper, props} = setupWithUser();

        enzymeWrapper.find(".glyphicon-log-out").simulate("click");
        expect(props.history.push.calledOnce).toEqual(true);
    });
});

describe("ShowNavBar Component Without User", () => {

    it("should render self and subcomponents", () => {
        const {enzymeWrapper, props} = setupWithNoUser();

        expect(enzymeWrapper.find("nav.navbar-inverse").length).toEqual(1);
        expect(enzymeWrapper.find("div.container-fluid").length).toEqual(1);
        expect(enzymeWrapper.find(".navbar-brand").length).toEqual(1);
        expect(enzymeWrapper.find(".glyphicon-home").length).toEqual(1);
        expect(enzymeWrapper.find('.glyphicon-search').length).toEqual(0);
        expect(enzymeWrapper.find(".glyphicon-log-out").length).toEqual(0);
        expect(enzymeWrapper.find(".glyphicon-log-in").length).toEqual(1);
    });

    it("should redirect when LogIn clicked", () => {

        const {enzymeWrapper, props} = setupWithNoUser();

        enzymeWrapper.find(".glyphicon-log-in").simulate("click");
        expect(props.history.push.calledOnce).toEqual(true);
    });

});
