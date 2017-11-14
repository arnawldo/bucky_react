import App from "../App";

import React from 'react';
import {Provider} from "react-redux"
import {MemoryRouter} from 'react-router-dom';
import Enzyme, {mount} from "enzyme";

import Adapter from 'enzyme-adapter-react-16';
import {createMockStore} from "redux-test-utils";


Enzyme.configure({adapter: new Adapter()});


describe('<App /> can render self', () => {

    const testState = {
        user: {},
        bucketlists: [],
        searchedBucketLists: [],
        notifications: []
    };

    const store = createMockStore(testState);

    const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Provider store={store}>
                <App/>
            </Provider>
        </MemoryRouter>
    );


    it('renders self and components', () => {
        expect(wrapper.find('.main-container').length).toEqual(1);
        expect(wrapper.find('h1').length).toEqual(1);
    });


});