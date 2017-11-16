import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowWelcome from "../ShowWelcome";

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowWelcome {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowWelcome />", () => {

    it("should render self", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find(".jumbotron").length).toEqual(1);
        expect(enzymeWrapper.find("h1").text()).toBe("Plan for the future today with Bucky!");
    });

    it("should attempt to redirect to register page when link is clicked", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("a.btn-success").simulate("click");
        expect(props.history.push.calledOnce).toEqual(true);
    });

});