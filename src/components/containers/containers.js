import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {clearNotifications, loginUser, registerUser} from "../../store/actions/actions";
import ShowRegister from "../ui/ShowRegister";
import ShowLogin from "../ui/ShowLogin";
import ShowNotifications from "../ui/ShowNotifications";


export const LoginPage = withRouter(connect(
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


export const RegisterPage = withRouter(connect(
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

export const Notifications = withRouter(connect(
    state => ({
        notifications: [...state.notifications]
    }),
    dispatch => ({
        onClearNotifications() {
            dispatch(clearNotifications())
        }
    })
)(ShowNotifications));