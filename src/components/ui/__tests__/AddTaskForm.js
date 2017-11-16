import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import AddTaskForm from "../AddTaskForm";

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        onNewTask: sinon.spy(),
        bucketId: 1,
        user: {username: "user", password: "test"}

    };

    const enzymeWrapper = mount(<AddTaskForm {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<AddTaskForm />", () => {

    it("should render self", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find("#newTaskForm").length).toEqual(1);
        expect(enzymeWrapper.find("input").length).toEqual(1);
        expect(enzymeWrapper.find("button").length).toEqual(1);
    });

    it("it should attempt to add task on submit", () => {
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.find("form").simulate("submit");
        expect(props.onNewTask.calledOnce).toEqual(true);
    })
});
