import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowRegister from "../ShowRegister";

Enzyme.configure({adapter: new Adapter()});


function setup() {
    const props = {
        onRegister: sinon.spy(),
        user: {},
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowRegister {...props} />);

    return {
        props,
        enzymeWrapper
    }
}


describe("<ShowRegister /> Component", () => {

    it("should render self and sub-components", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find(".page-header").length).toEqual(1);
        expect(enzymeWrapper.find("form").length).toEqual(1);
        expect(enzymeWrapper.find("button").text()).toBe("REGISTER");


    });

    it("should make register attemp on form submit", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("form").simulate("submit");
        expect(props.onRegister.calledOnce).toEqual(true);
    });

    it("should redirect to login page when clicking login link", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("a").simulate("click");
        expect(props.history.push.calledOnce).toEqual(true);
    })
});
