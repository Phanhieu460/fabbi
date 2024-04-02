// reducers.ts
import { combineReducers } from 'redux';

const initialState = {
    meal: '',
    people: 1,
    restaurant: '',
    dishes: [],
    step: 0
}

const orderReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_MEAL':
            return {
                ...state,
                meal: action.payload
            };
        case 'ADD_PERSON':
            return {
                ...state,
                people: action.payload
            };
        case 'ADD_RESTAURANT':
            return {
                ...state,
                restaurant: action.payload
            }
        case 'ADD_DISH':
            return {
                ...state,
                dishes: [
                    ...state.dishes,
                    { name: action.payload.name, quantity: action.payload.quantity }
                ]
            }
        case 'NEXT_STEP':
            return {
                ...state,
                step: action.payload
            }
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    order: orderReducer,
});

export default rootReducer;
