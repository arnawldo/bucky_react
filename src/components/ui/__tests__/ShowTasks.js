import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowTasks from "../ShowTasks";

Enzyme.configure({adapter: new Adapter()});

function setupWithTasks() {
    const props = {
        onFetchTasks: sinon.spy(),
        user: {username: "arnold", password: "test"},
        bucketId: 1,
        bucketlists: [{id:1, name:"buck", tasks: [{id: 1, description: "taky"}], editMode: false}],
        onRemoveTask: sinon.spy(),
        history: {push: sinon.spy()},
        onTaskExitEditMode: sinon.spy(),
        onTaskEnterEditMode: sinon.spy(),
        onEditTask: sinon.spy()
    };

    const enzymeWrapper = mount(<ShowTasks {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupWithNoTasks() {
    const props = {
        onFetchTasks: sinon.spy(),
        user: {username: "arnold", password: "test"},
        bucketId: 1,
        bucketlists: [{id:1, name:"buck", tasks: [], editMode: false}],
        onRemoveTask: sinon.spy(),
        history: {push: sinon.spy()},
        onTaskExitEditMode: sinon.spy(),
        onTaskEnterEditMode: sinon.spy(),
        onEditTask: sinon.spy()
    };

    const enzymeWrapper = mount(<ShowTasks {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupWithNoUser() {
    const props = {
        onFetchTasks: sinon.spy(),
        user: {},
        bucketId: 1,
        bucketlists: [{id:1, name:"buck", tasks: [{id: 1, description: "taky", editMode: false}], editMode: false}],
        onRemoveTask: sinon.spy(),
        history: {push: sinon.spy()},
        onTaskExitEditMode: sinon.spy(),
        onTaskEnterEditMode: sinon.spy(),
        onEditTask: sinon.spy()
    };

    const enzymeWrapper = mount(<ShowTasks {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowTasks /> With Tasks", () => {

    it("should render self and subcomponents", () => {
        const {enzymeWrapper, props} = setupWithTasks();

        expect(props.onFetchTasks.calledOnce).toEqual(true);

        expect(enzymeWrapper.find("#list-of-tasks").length).toEqual(1);
        expect(enzymeWrapper.find("li").text()).toBe(props.bucketlists[0].tasks[0].description);

    });

    it("should fetch tasks after mounting", () => {
        const {props} = setupWithTasks();

        expect(props.onFetchTasks.calledOnce).toEqual(true);

    })
});



describe("<ShowTasks /> with no tasks", () => {

    it("should render no tasks", () => {
        const {enzymeWrapper, props} = setupWithNoTasks();

        expect(props.onFetchTasks.calledOnce).toEqual(true);

        expect(enzymeWrapper.find("#list-of-tasks").length).toEqual(1);
        expect(enzymeWrapper.find("li").text()).toBe("No Tasks Here. (Add a Task)");


    });
});



describe("<ShowTasks /> for not logged in user", () => {
    it("should redirect to home", () => {
        const {enzymeWrapper, props} = setupWithNoUser();

        expect(props.onFetchTasks.calledOnce).toEqual(false);
        expect(enzymeWrapper.find("#list-of-tasks").length).toEqual(0);
        expect(props.history.push.calledOnce).toEqual(true);
    });
});

