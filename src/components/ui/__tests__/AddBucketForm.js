import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import AddBucketForm from "../AddBucketForm";

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        onNewBucket: sinon.spy(),
        user: {username: "tester", password: "test"}
    };

    const enzymeWrapper = mount(<AddBucketForm {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<AddBucketForm /> ", () => {
    it("should render self and sub-components", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find("#newBucketForm").length).toEqual(1);
        expect(enzymeWrapper.find("#newBucketName").length).toEqual(1);
        expect(enzymeWrapper.find("#add-bucketlist").length).toEqual(1);
    });

    it("should attempt to add bucket-list on submit", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("form").simulate("submit");
        expect(props.onNewBucket.calledOnce).toEqual(true);
    })
});
