import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import SearchedBucket from "../SearchedBucket";

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        id: 1,
        name: "buck",
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<SearchedBucket {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<SearchedBucket />", () => {

    it("should render self and sub-components", () => {
        const {enzymeWrapper, props} = setup();

        expect(enzymeWrapper.find(".bucket").length).toEqual(1);
        expect(enzymeWrapper.find("a").text()).toBe(props.name);

    });

    it("should render redirect on click", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("a").simulate("click");
        expect(props.history.push.calledOnce).toEqual(true);
    });
});