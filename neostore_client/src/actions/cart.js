import { UPDATECART } from './constants'

export const updateCart = () => async (dispatch) => {
    try {
        dispatch({ type: UPDATECART })
    } catch (error) {
        console.log(error);
    }
}