import React, {Component} from 'react'
import PropTypes from 'prop-types';


class ShowRegister extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.goToLogin = this.goToLogin.bind(this)
    }

    submit(e) {
        const { _username, _password } = this.refs;
        const { onRegister } = this.props;
        e.preventDefault();
        onRegister(_username.value, _password.value);
        _username.focus()
    }

    goToLogin(e) {
        const { history } = this.props;
        e.preventDefault();
        history.push('/');
    }

    componentWillMount() {
        const { user, history } = this.props;
        if (user.hasOwnProperty("username")) {
            history.push('/');
        }
    }

    render() {

        return (
            <div>
                <div className="page-header">
                    <h1>Register</h1>
                </div>
                <form className="gloria-font" id="registerForm" onSubmit={this.submit}>
                    <input ref="_username"
                           type="text"
                           placeholder="username" required/>
                    <input ref="_password"
                           type="password"
                           placeholder="password" required/>
                    <button>REGISTER</button>
                </form>
                <br/>
                <p>Already a User? <a onClick={this.goToLogin}>Click here to login</a></p>

            </div>
        )
    }

}

ShowRegister.propTypes = {
    onRegister: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default ShowRegister