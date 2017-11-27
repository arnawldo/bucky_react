import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowLoadingDots from "../ShowLoadingDots";

Enzyme.configure({adapter: new Adapter()});

function setupIsLoading() {
    const props = {
        isLoading: true
    };

    const enzymeWrapper = mount(<ShowLoadingDots {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowLoadingDots />", () => {

    it("should render self", () => {
        const {enzymeWrapper} = setupIsLoading();

        expect(enzymeWrapper.find(".dot").length).toEqual(3);
        expect(enzymeWrapper.find(".loading-dots").length).toEqual(1);
    });
});

function setupIsNotLoading() {
    const props = {
        isLoading: false
    };

    const enzymeWrapper = mount(<ShowLoadingDots {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowLoadingDots />", () => {

    it("should render self", () => {
        const {enzymeWrapper} = setupIsNotLoading();

        expect(enzymeWrapper.find(".dot").length).toEqual(0);
        expect(enzymeWrapper.find(".loading-dots").length).toEqual(0);
    });
});
