import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ location }) =>
    <div className="notFound">
        <h1>'{location.pathname}' Not Found</h1>
    </div>;

NotFound.propTypes = {
    location: PropTypes.object.isRequired
};


export default NotFound
