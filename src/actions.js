import axios from "axios";
import C from "./constants";

// API endpoints
const USERENDPOINT = "/api/v1.0/auth/users/";

/**
 * Make request to register a new user.
 * Add user to store if successful, show error message otherwise
 *
 * @param {string} username - The username of new user.
 * @param {string} password - The password of new user.
 */
export const registerUser = (username, password) => dispatch =>
    axios.post(USERENDPOINT,
        {
            data: {
                username: username,
                password: password
            }
        })
        .then((res => {
            if (res.status === 201) {
                // user was created
                // add user details to store
                return ({
                    type: C.ADD_USER,
                    username: username,
                    password: password
                })
            }
        }))
        .then(dispatch)
        .catch((error) => {
            if (error.response.status === 409) {
                // user already exists
                // should log in
                dispatch({
                    type: C.ADD_NOTIFICATION,
                    notification: "This username already exists!"
                })
            }
        });