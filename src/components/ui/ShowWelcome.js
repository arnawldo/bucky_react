import React from 'react'
import PropTypes from 'prop-types';

const ShowWelcome = ({user, history}) => {

    // if user is logged in, go to bucket-lists page
    if (user.hasOwnProperty("username")) {
        history.push("/bucketlists")
    }

    const goToRegister = (e) => {
        e.preventDefault();
        history.push("/register")
    };


    return (
        <div className="jumbotron gloria-font">
            <h1>Plan for the future today with Bucky!</h1>
            <p><a className="btn btn-success btn-lg" href="/ignore-this-url" role="button" onClick={goToRegister}>Get started</a></p>
        </div>
    )
};

ShowWelcome.propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default ShowWelcome