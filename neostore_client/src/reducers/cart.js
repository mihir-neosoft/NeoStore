import { UPDATECART } from '../actions/constants';

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATECART:
            console.log("in reducer", JSON.parse(localStorage.getItem('cart')));
            return JSON.parse(localStorage.getItem('cart'));

        default:
            return state;
    }
}

export default cartReducer;