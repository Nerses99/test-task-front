import * as ActionTypes from "../ActionTypes/AuthActions";
import AuthService from "./../../../../services/auth";

export const clearError = (creds) => {
    return {
        type: ActionTypes.CLEAR_ERROR,
    };
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds,
    };
};

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.data.token,
    };
};

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message,
    };
};

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    return AuthService.login(creds)
        .then((response) => {
            localStorage.setItem("token", response?.data?.token);
            localStorage.setItem(
                "creds",
                JSON.stringify(response?.data?.userData)
            );
            dispatch(receiveLogin(response));
            return response;
        })
        .catch((error) => {
            dispatch(loginError(error.response?.data?.message));
            return error;
        });
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST,
    };
};

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS,
    };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("creds");
    dispatch(receiveLogout());
    window.location.assign("/");
};

export const registerUser = (creds) => (dispatch) => {
    dispatch(registerRequest(creds));
    return AuthService.singUp(creds)
        .then((response) => {
            dispatch(registerCompleted(response));
            return response;
        })
        .catch((error) => {
            console.log(error);
            dispatch(registerFailed(error.response?.data?.message));
            return error;
        });
};

export const registerRequest = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        creds,
    };
};

export const registerCompleted = (payload) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        payload,
    };
};

export const registerFailed = (payload) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        payload,
    };
};
