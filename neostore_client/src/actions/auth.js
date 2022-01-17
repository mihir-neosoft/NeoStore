import * as api from '../api/index'
import { AUTH } from './constants'


export const login = (formData) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);
        dispatch({ type: AUTH, data });
        window.location.href = "/"
    } catch (error) {
        console.log(error);
        console.log(error?.response?.data?.message);
    }
}

export const register = (formData) => async (dispatch) => {
    try {
        const { data } = await api.register(formData)
        dispatch({ type: AUTH, data })
        // const { info } = await api.createProfile({name: data?.result?.name, email: data?.result?.email, userId: data?.result?._id, phoneNumber: '', businessName: '', contactAddress: '', logo: '', website: ''});
        // dispatch({ type: CREATE_PROFILE, payload: info });
        window.location.href = "/login";
    } catch (error) {
        console.log(error);
    }
}

export const forgotPassword = (formData) => async (dispatch) => {
    try {
        await api.forgotPassword(formData)
        window.location.href = '/resetpassword';
    } catch (error) {
        console.log(error)
    }
}

export const resetPassword = (formData) => async (dispatch) => {
    try {
        await api.resetPassword(formData)
        window.location.href = '/login';

    } catch (error) {
        alert(error)
    }
}

export const changePassword = (formData) => async (dispatch) => {
    try {
        await api.changePassword(formData)
    } catch (error) {
        alert(error)
    }
}
