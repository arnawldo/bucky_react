import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowSearchedBuckets from "../ShowSearchedBuckets";

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        user: {username: "arnold", password: "test"},
        searchedBucketLists: [{id: 1, name: "buck", tasks: []}],
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowSearchedBuckets {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowSearchedBuckets />", () => {

    it("should render self and sub-components", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find("#list-of-buckets").length).toEqual(1);
        expect(enzymeWrapper.find("a").text()).toBe("buck");

    });

});

function setupWithoutBuckets() {
    const props = {
        user: {username: "arnold", password: "test"},
        searchedBucketLists: [],
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowSearchedBuckets {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowSearchedBuckets />", () => {

    it("should render no buckets", () => {
        const {enzymeWrapper} = setupWithoutBuckets();

        expect(enzymeWrapper.find("li").text()).toBe("No Results");

    });
});

function setupWithoutUser() {
    const props = {
        user: {},
        searchedBucketLists: [],
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowSearchedBuckets {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowSearchedBuckets />", () => {
    it("should redirect to Login Page", () => {
        const {props} = setupWithoutUser();

        expect(props.history.push.calledOnce).toEqual(true);
    });
});