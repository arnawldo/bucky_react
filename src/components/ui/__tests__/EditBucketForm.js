import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import EditBucketForm from "../EditBucketForm";

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        bucketId: 1,
        onEditBucket: sinon.spy(),
        onBucketExitEditMode: sinon.spy(),
        user: {username: "tester", password: "test"}
    };

    const enzymeWrapper = mount(<EditBucketForm {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<EditBucketForm />", () => {

    it("should render self", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find("#editBucketForm").length).toEqual(1);
    });

    it("should attempt bucket-list edit on submit", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("form").simulate("submit");
        expect(props.onEditBucket.calledOnce).toEqual(true);
    });

    it("should attempt to exit edit mode on clicking cross", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find(".glyphicon-remove").simulate("click");
        expect(props.onBucketExitEditMode.calledOnce).toEqual(true);
    })
});