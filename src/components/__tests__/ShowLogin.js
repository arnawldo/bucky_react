import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowLogin from "../ui/ShowLogin";

Enzyme.configure({adapter: new Adapter()});


function setup() {
    const props = {
        onLogin: sinon.spy(),
        user: {},
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowLogin {...props} />);

    return {
        props,
        enzymeWrapper
    }
}


describe("<ShowLogin /> Component", () => {

    it("should render self and sub-components", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find(".page-header").length).toEqual(1);
        expect(enzymeWrapper.find("form").length).toEqual(1);
        expect(enzymeWrapper.find("button").text()).toBe("LOGIN");
        expect(enzymeWrapper.find("p").text()).toBe("New User? Click here to register");


    });

    it("should make login attempt on form submit", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("form").simulate("submit");
        expect(props.onLogin.calledOnce).toEqual(true);
    });

    it("should redirect to register page when clicking register link", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("a").simulate("click");
        expect(props.history.push.calledOnce).toEqual(true);
    })
});
