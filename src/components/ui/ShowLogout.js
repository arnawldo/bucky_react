import React, {Component} from 'react'
import PropTypes from 'prop-types';


class ShowLogout extends Component {


    componentWillMount() {
        const {user, onClearBuckets, onClearUser, history} = this.props;
        if (user.hasOwnProperty("username")) {
            onClearBuckets();
            onClearUser();
        }
        history.push('/')
    }

    render() {
        return <p>Redirecting...</p>
    }

}

ShowLogout.propTypes = {
    onClearUser: PropTypes.func.isRequired,
    onClearBuckets: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default ShowLogout
