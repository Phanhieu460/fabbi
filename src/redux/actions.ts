// actions.ts
import { ADD_MEAL, ADD_PERSON, ADD_RESTAURANT, ADD_DISH, NEXT_STEP } from './constants';

export const addMeal = (meal: string) => ({
    type: ADD_MEAL as typeof ADD_MEAL,
    payload: meal
});

export const addPerson = (person: number) => ({
    type: ADD_PERSON as typeof ADD_PERSON,
    payload: person
});

export const addRestaurant = (restaurant: string) => ({
    type: ADD_RESTAURANT as typeof ADD_RESTAURANT,
    payload: restaurant
});

export const addDish = (name: string, quantity: number) => ({
    type: ADD_DISH as typeof ADD_DISH,
    payload: { name, quantity }
});

export const nextStep = (value: number) => ({
    type: NEXT_STEP as typeof NEXT_STEP,
    payload: value
})

export const resetState = () => ({
    type: 'RESET_STATE'
});
