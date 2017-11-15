import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {loginUser, registerUser} from "./actions";
import ShowRegister from "./components/ui/ShowRegister";
import ShowLogin from "./components/ui/ShowLogin";


export const LoginPage =withRouter(connect(
    (state, props) =>
        ({
            user: {...state.user},
            history: props.history
        }),
    dispatch =>
        ({
            onLogin(username, password) {
                dispatch(loginUser(username, password))
            }
        })
)(ShowLogin));


export const RegisterPage =withRouter(connect(
    (state, props) =>
        ({
            user: {...state.user},
            history: props.history
        }),
    dispatch =>
        ({
            onRegister(username, password) {
                dispatch(registerUser(username, password))
            }
        })
)(ShowRegister));