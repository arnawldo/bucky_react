import React, {Component} from 'react'
import PropTypes from 'prop-types';

class ShowLogin extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
    }

    submit(e) {
        const { _username, _password } = this.refs;
        const { onLogin } = this.props;
        e.preventDefault();
        onLogin(_username.value, _password.value);
        _username.focus()
    }

    goToRegister(e) {
        const { history } = this.props;
        e.preventDefault();
        history.push('/register');
    }

    componentWillMount() {
        const { user, history } = this.props;
        if (user.hasOwnProperty("username")) {
            history.push('/bucketlists');
        }
    }

    componentDidUpdate() {
        const { user, history } = this.props;
        if (user.hasOwnProperty("username")) {
            history.push('/bucketlists');
        }
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h1>Login</h1>
                </div>
                <form className="gloria-font" id="loginForm" onSubmit={this.submit}>
                    <input ref="_username"
                           type="text"
                           placeholder="username" required/>
                    <input ref="_password"
                           type="password"
                           placeholder="password" required/>
                    <button>LOGIN</button>
                </form>
                <br/>
                <p>New User? <a onClick={this.goToRegister}>Click here to register</a></p>
            </div>
        )
    }
}


ShowLogin.propTypes = {
    onLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default ShowLogin