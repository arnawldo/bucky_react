import React, {Component} from 'react'
import PropTypes from 'prop-types';

class ShowNotifications extends Component {

    componentWillUnmount() {
        const {onClearNotifications} = this.props;
        onClearNotifications();
    }


    render() {
        const {notifications, onClearNotifications} = this.props;
        return (<ul>
            {(notifications.length !== 0) ?
                notifications.map((message, i) => (
                        <div key={i} className="alert alert-warning">
                            <button type="button" className="close" data-dismiss="alert" onClick={() => {onClearNotifications()}}>&times;</button>
                            {message}
                        </div>
                    )
                ) : null
            }
        </ul>);

    }
}

ShowNotifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    onClearNotifications: PropTypes.func.isRequired
};


export default ShowNotifications