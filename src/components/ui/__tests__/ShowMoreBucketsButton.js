import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowMoreBucketsButton from "../ShowMoreBucketsButton";

Enzyme.configure({adapter: new Adapter()});

function setupWithNoNextPage() {
    const props = {
        user: {username: "tester", password: "test"},
        bucketPaginator: {page: 1, hasNextPage: false},
        onFetchBucketPage: sinon.spy()
    };

    const enzymeWrapper = mount(<ShowMoreBucketsButton {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupWithNextPage() {
    const props = {
        user: {username: "tester", password: "test"},
        bucketPaginator: {page: 1, hasNextPage: true},
        onFetchBucketPage: sinon.spy()
    };

    const enzymeWrapper = mount(<ShowMoreBucketsButton {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowMoreBucketsButton /> without next page", () => {

    it("should not render button", () => {
        const {enzymeWrapper} = setupWithNoNextPage();

        expect(enzymeWrapper.find(".glyphicon-plus").length).toEqual(0);
    });

});

describe("<ShowMoreBucketsButton /> with next page", () => {

    it("should render button", () => {
        const {enzymeWrapper} = setupWithNextPage();

        expect(enzymeWrapper.find(".glyphicon-plus").length).toEqual(1);
    });

    it("should attempt fetching more bucket-lists on clicking button", () => {
        const {enzymeWrapper, props} = setupWithNextPage();

        enzymeWrapper.find(".glyphicon-plus").simulate("click");
        expect(props.onFetchBucketPage.calledOnce).toEqual(true);
    });

});