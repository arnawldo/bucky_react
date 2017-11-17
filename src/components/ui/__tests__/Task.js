import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import Task from "../Task";

Enzyme.configure({adapter: new Adapter()});

function setupTaskNotInEditMode() {
    const props = {
        bucketId: 1,
        taskId: 1,
        user: {username: "user", password: "test"},
        editMode: false,
        description: "taky",
        onRemoveTask: sinon.spy(),
        onEditTask: sinon.spy(),
        onTaskEnterEditMode: sinon.spy(),
        onTaskExitEditMode: sinon.spy()
    };

    const enzymeWrapper = mount(<Task {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupTaskInEditMode() {
    const props = {
        bucketId: 1,
        taskId: 1,
        user: {username: "user", password: "test"},
        editMode: true,
        description: "taky",
        onRemoveTask: sinon.spy(),
        onEditTask: sinon.spy(),
        onTaskEnterEditMode: sinon.spy(),
        onTaskExitEditMode: sinon.spy()
    };

    const enzymeWrapper = mount(<Task {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<Task /> not in edit mode", () => {
    it("should render self", () => {
        const {enzymeWrapper, props} = setupTaskNotInEditMode();

        expect(props.onRemoveTask.calledOnce).toEqual(false);

        expect(enzymeWrapper.find("li.bucket").length).toEqual(1);
        expect(enzymeWrapper.find("button").length).toEqual(2);

    });

    it("should delete task on clicking delete", () => {
        const {enzymeWrapper, props} = setupTaskNotInEditMode();

        enzymeWrapper.find("button#deleteButton").simulate("click");
        expect(props.onRemoveTask.calledOnce).toEqual(true);

    })
});

describe("<Task /> in edit mode", () => {
    it("should render one <EditTask /> form", () => {
        const {enzymeWrapper} = setupTaskInEditMode();

        expect(enzymeWrapper.find("form").length).toEqual(1);

    });

});