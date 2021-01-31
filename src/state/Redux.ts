//types

import { configureStore } from '@reduxjs/toolkit';
import { findAndToggleApplicationInRestaurants } from '../util/findAndToggleApplicationInRestaurant';
import { reduceApplicationsIntoRestaurants } from '../util/reduceApplicationsIntoRestaurants';
import { Application } from "./Application.model";
import { Restaurant } from "./Restaurant.model";

// types

export const SELECT_RESTAURANT = 'SELECT_RESTAURANT'
export const SELECT_APPLICATION = 'SELECT_APPLICATION'
export const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS'
export const TOGGLE_APPLICATION_VIEWED = 'TOGGLE_APPLICATION_VIEWED'


interface SelectRestaurantAction {
  type: typeof SELECT_RESTAURANT
  restaurant: Restaurant
}

interface SelectApplicationAction {
  type: typeof SELECT_APPLICATION
  application: Application
}

interface LoadRestaurantsAction {
	type: typeof LOAD_RESTAURANTS
	applications: Application[]
}

interface ToggleApplicationViewedAction {
	type: typeof TOGGLE_APPLICATION_VIEWED,
	application: Application
}

export type ActionTypes = SelectRestaurantAction |
													SelectApplicationAction |
													LoadRestaurantsAction |
													ToggleApplicationViewedAction;


// action creators

export function selectRestaurant(restaurant: Restaurant): ActionTypes {
  return {
    type: SELECT_RESTAURANT,
    restaurant
  }
}

export function selectApplication(application: Application): ActionTypes {
  return {
    type: SELECT_APPLICATION,
    application
  }
}

export function loadRestaurants(applications: Application[]): ActionTypes {
  return {
    type: LOAD_RESTAURANTS,
    applications
  }
}

export function toggleApplicationViewed(application: Application): ActionTypes {
  return {
		type: TOGGLE_APPLICATION_VIEWED,
		application
  }
}

export type RootState = {
	selectedRestaurant?: Restaurant;
	selectedApplication?: Application;
	restaurants?: Restaurant[],
}

const initialAppState: RootState = {
	selectedApplication: undefined,
	selectedRestaurant: undefined,
	restaurants: []
}


const reducer = (state: RootState = initialAppState, action: ActionTypes): RootState =>{
  switch (action.type) {
    case SELECT_RESTAURANT:
      return {...state, selectedRestaurant: action.restaurant};
    case SELECT_APPLICATION:
			return {...state, selectedApplication: action.application};
		case LOAD_RESTAURANTS:
			return {...state, restaurants: reduceApplicationsIntoRestaurants(action.applications)};
		case TOGGLE_APPLICATION_VIEWED:
			return {...state, restaurants: findAndToggleApplicationInRestaurants(state.restaurants, action.application)};
    default:
      return state
  }
}

export const store = configureStore({
  reducer
})