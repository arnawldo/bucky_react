import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowBucketName from "../ShowBucketName";

Enzyme.configure({adapter: new Adapter()});


function setup() {
    const props = {
        bucketId: 1,
        bucketlists: [
            {
                id: 1,
                name: "bucket 1",
                tasks: [], editMode: false
            },
            {
                id: 2,
                name: "bucket 2",
                tasks: [], editMode: false
            }
        ]};

    const enzymeWrapper = mount(<ShowBucketName {...props} />);

    return {
        props,
        enzymeWrapper
    }
}


describe("<ShowBucket />", () => {

    it("should render self", () => {
        const {enzymeWrapper} = setup();

        expect(enzymeWrapper.find("div").length).toEqual(1);
        expect(enzymeWrapper.find("h1").length).toEqual(1);
        expect(enzymeWrapper.find("h1").text()).toBe("bucket 1");

    });

});