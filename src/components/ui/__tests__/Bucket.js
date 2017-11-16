import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import Bucket from "../Bucket";

Enzyme.configure({adapter: new Adapter()});

function setupBucketInMode() {
    const props = {
        onRemoveBucket: sinon.spy(),
        id: 3,
        name: "buck",
        editMode:true,
        user: {username: "user", password: "test"},
        onRemoveBucket: sinon.spy(),
        onBucketEnterEditMode: sinon.spy(),
        onEditBucket: sinon.spy(),
        onBucketExitEditMode: sinon.spy()
    };

    const enzymeWrapper = mount(<Bucket {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupBucketNotInMode() {
    const props = {
        onRemoveBucket: sinon.spy(),
        id: 3,
        name: "buck",
        editMode:false,
        user: {username: "user", password: "test"},
        onRemoveBucket: sinon.spy(),
        onBucketEnterEditMode: sinon.spy(),
        onEditBucket: sinon.spy(),
        onBucketExitEditMode: sinon.spy()
    };

    const enzymeWrapper = mount(<Bucket {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<Bucket /> in edit mode", () => {
    
    it("should render <EditBucket />", () => {
        const {enzymeWrapper} = setupBucketInMode();

        expect(enzymeWrapper.find("form").length).toEqual(1);

    });

});

describe("<Bucket /> not in edit mode", () => {

    it("should render <EditBucket />", () => {
        const {enzymeWrapper, props} = setupBucketNotInMode();

        expect(enzymeWrapper.find("li.bucket").length).toEqual(1);
        expect(enzymeWrapper.find("button").length).toEqual(2);
        expect(enzymeWrapper.find("a").text()).toBe(props.name);

    });

    it("should attempt to remove bucket on clicking delete button", () => {
        const {enzymeWrapper, props} = setupBucketNotInMode();

        enzymeWrapper.find("button#deleteButton").simulate("click");
        expect(props.onRemoveBucket.calledOnce).toEqual(true);
    });

});