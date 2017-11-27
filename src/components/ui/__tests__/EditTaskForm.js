import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import EditTaskForm from "../EditTaskForm";

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        bucketId: 1,
        taskId: 1,
        description: "task 1",
        onEditTask: sinon.spy(),
        onTaskExitEditMode: sinon.spy(),
        user: {username: "tester", password: "test"}
    };

    const enzymeWrapper = mount(<EditTaskForm {...props} />);

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

    it("should attempt task edit on submit", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("form").simulate("submit");
        expect(props.onEditTask.calledOnce).toEqual(true);
    });

    it("should attempt to exit edit mode on clicking cross", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find(".glyphicon-remove").simulate("click");
        expect(props.onTaskExitEditMode.calledOnce).toEqual(true);
    })
});