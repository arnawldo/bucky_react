import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowSearchBucketForm from "../ShowSearchBucketForm";

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        onSearchBucket: sinon.spy(),
        user: {username: "user", password: "test"}
    };

    const enzymeWrapper = mount(<ShowSearchBucketForm {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowSearchBucketForm />", () => {

    it("should render self and subcomponents", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find("#newBucketForm").length).toEqual(1);
        expect(enzymeWrapper.find("button").text()).toBe("GO");

    });

    it("should attempt to search when submitted", () => {

        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("form").simulate("submit");
        expect(props.onSearchBucket.calledOnce).toEqual(true);

    })
});