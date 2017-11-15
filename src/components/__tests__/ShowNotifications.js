import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowNotifications from "../ui/ShowNotifications";

Enzyme.configure({adapter: new Adapter()});


function setupWithoutNotifications() {
    const props = {
        onClearNotifications: sinon.spy(),
        notifications: []
    };

    const enzymeWrapper = mount(<ShowNotifications {...props} />);

    return {
        props,
        enzymeWrapper
    }
}


function setupWithNotifications() {
    const props = {
        onClearNotifications: sinon.spy(),
        notifications: ["Try again!"]
    };

    const enzymeWrapper = mount(<ShowNotifications {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowNotifications /> Component", () => {

    it("should not render self when there are no notifications", () => {
        const {enzymeWrapper} = setupWithoutNotifications();

        expect(enzymeWrapper.find(".alert").length).toEqual(0);
    });

    it("should render self when there are notifications", () => {
        const {enzymeWrapper, props} = setupWithNotifications();

        expect(enzymeWrapper.find(".alert").length).toEqual(1);
        enzymeWrapper.find("button").simulate("click");
        expect(props.onClearNotifications.calledOnce).toEqual(true);
    });

});
