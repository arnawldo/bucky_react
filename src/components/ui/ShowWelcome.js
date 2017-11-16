import React, {Component} from 'react'
import PropTypes from 'prop-types';

const ShowWelcome = ({history}) => {

    const goToRegister = (e) => {
        e.preventDefault();
        history.push("/register")
    };


    return (
        <div className="jumbotron gloria-font">
            <h1>Plan for the future today with Bucky!</h1>
            <p><a className="btn btn-success btn-lg" href="#" role="button" onClick={goToRegister}>Get started</a></p>
        </div>
    )
};

ShowWelcome.propTypes = {
    history: PropTypes.object.isRequired
};

export default ShowWelcome