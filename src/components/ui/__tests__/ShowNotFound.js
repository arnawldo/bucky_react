import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NotFound from "../ShowNotFound";

Enzyme.configure({adapter: new Adapter()});


function setup() {
    const props = {
        location: {pathname: "/here"}
    };

    const enzymeWrapper = mount(<NotFound {...props} />);

    return {
        props,
        enzymeWrapper
    }
}


describe("<NotFound />", () => {
    it("should render self and subcomponents", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find(".notFound").length).toEqual(1);

        expect(enzymeWrapper.find("h1").text()).toBe("'/here' Not Found");
    });
});
