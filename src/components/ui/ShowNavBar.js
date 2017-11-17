import React from 'react'
import PropTypes from 'prop-types';

const ShowNavBar = ({user, history}) => {

    const goToBucketLists = (e) => {
        e.preventDefault();
        history.push("/bucketlists")
    };

    const goToSearch = (e) => {
        e.preventDefault();
        history.push("/bucketlists/search")
    };

    const goToLogin = (e) => {
        e.preventDefault();
        history.push("/login")
    };

    const goToLogout = (e) => {
        e.preventDefault();
        history.push("/logout")
    };

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand gloria-font" href="/ignore-this-url" onClick={goToBucketLists}>Bucky</a>
                </div>
                <ul className="nav navbar-nav">
                    <li><a href="/ignore-this-url" onClick={goToBucketLists}>Home <i className="glyphicon glyphicon-home"></i></a></li>
                    {(user.hasOwnProperty("username")) ?
                        <li><a href="#" onClick={goToSearch}>Search <i className="glyphicon glyphicon-search"></i></a></li> :
                        null
                    }
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    {(user.hasOwnProperty("username")) ?
                        <li><a href="/ignore-this-url" onClick={goToLogout}>Logout <i className="glyphicon glyphicon-log-out"></i></a></li> :
                        <li><a href="/ignore-this-url" onClick={goToLogin}>Login <i className="glyphicon glyphicon-log-in"></i></a></li>
                    }

                </ul>
            </div>
        </nav>
    )
};

ShowNavBar.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object
};

export default ShowNavBar