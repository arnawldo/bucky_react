import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import ShowBuckets from "../ShowBuckets";

Enzyme.configure({adapter: new Adapter()});

function setupOneBucket() {
    const props = {
        onFetchBuckets: sinon.spy(),
        user: {username: "arnold", password: "test"},
        bucketlists: [{id: 1, name: "buck", tasks: [], editMode: false}],
        bucketPaginator: {page: 1, hasNextPage: false},
        onFetchBucketPage: sinon.spy(),
        onEditBucket: sinon.spy(),
        onBucketEnterEditMode: sinon.spy(),
        onBucketExitEditMode: sinon.spy(),
        onRemoveBucket: sinon.spy(),
        onResetPageCounter: sinon.spy(),
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowBuckets {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupPaginatedBuckets() {
    const props = {
        onFetchBuckets: sinon.spy(),
        user: {username: "arnold", password: "test"},
        bucketlists: [{id: 1, name: "buck", tasks: [], editMode: false}],
        bucketPaginator: {page: 1, hasNextPage: true},
        onFetchBucketPage: sinon.spy(),
        onEditBucket: sinon.spy(),
        onBucketEnterEditMode: sinon.spy(),
        onBucketExitEditMode: sinon.spy(),
        onRemoveBucket: sinon.spy(),
        onResetPageCounter: sinon.spy(),
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowBuckets {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupWithoutBuckets() {
    const props = {
        onFetchBuckets: sinon.spy(),
        user: {username: "arnold", password: "test"},
        bucketlists: [],
        bucketPaginator: {page: 1, hasNextPage: false},
        onFetchBucketPage: sinon.spy(),
        onEditBucket: sinon.spy(),
        onBucketEnterEditMode: sinon.spy(),
        onBucketExitEditMode: sinon.spy(),
        onRemoveBucket: sinon.spy(),
        onResetPageCounter: sinon.spy(),
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowBuckets {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

function setupWithoutUser() {
    const props = {
        onFetchBuckets: sinon.spy(),
        user: {},
        bucketlists: [],
        bucketPaginator: {page: 1, hasNextPage: false},
        onFetchBucketPage: sinon.spy(),
        onEditBucket: sinon.spy(),
        onBucketEnterEditMode: sinon.spy(),
        onBucketExitEditMode: sinon.spy(),
        onRemoveBucket: sinon.spy(),
        onResetPageCounter: sinon.spy(),
        history: {push: sinon.spy()}
    };

    const enzymeWrapper = mount(<ShowBuckets {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("<ShowBuckets /> with one bucket", () => {

    it("should render self and subcomponents", () => {
        const {enzymeWrapper, props} = setupOneBucket();


        expect(enzymeWrapper.find("#list-of-buckets").length).toEqual(1);
        expect(enzymeWrapper.find("a").text()).toBe(props.bucketlists[0].name);

    });

    it("should fetch buckets on mount", () => {
        const {props} = setupOneBucket();

        expect(props.onFetchBuckets.calledOnce).toEqual(true);

    });

});


describe("<ShowBuckets /> with many bucket-list pages", () => {


    it("should render next page button", () => {
        const {enzymeWrapper} = setupPaginatedBuckets();

        expect(enzymeWrapper.find("li.more-buckets-button-container").length).toEqual(1);

    });

});


describe("<ShowBuckets /> with no bucket-lists", () => {

    it("should not render any buckets", () => {
        const {enzymeWrapper} = setupWithoutBuckets();

        expect(enzymeWrapper.find("li.bucket").text()).toBe("No Buckets Here. (Add a Bucket)");

    });
});



describe("<ShowBuckets /> for not logged in user", () => {
    
    it("should redirect to Login Page", () => {
        const {props} = setupWithoutUser();

        expect(props.history.push.calledOnce).toEqual(true);
    });
});