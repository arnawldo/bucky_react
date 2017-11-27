import React from 'react'
import PropTypes from 'prop-types';

const ShowLoadingDots = ({isLoading}) => {

    if (isLoading === true) {
        return (
            <div className="loading-dots">
                <h1 className="dot one">.</h1>
                <h1 className="dot two">.</h1>
                <h1 className="dot three">.</h1>
            </div>)
    } else {
        return null
    }
};


ShowLoadingDots.propTypes = {
    isLoading: PropTypes.bool.isRequired
};

export default ShowLoadingDots