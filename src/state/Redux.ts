//types

import {
  configureStore,
  createAction,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit';
import {reduceApplicationsIntoRestaurants} from '../util/reduceApplicationsIntoRestaurants';
import {Application} from './Application.model';
import {Restaurant} from './Restaurant.model';

// types

export const SELECT_RESTAURANT = 'SELECT_RESTAURANT';
export const SELECT_APPLICATION = 'SELECT_APPLICATION';
export const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';

// action creators

export const loadRestaurants = createAction<Application[]>(LOAD_RESTAURANTS);
export const selectApplication = createAction<Application>(SELECT_APPLICATION);
export const selectRestaurant = createAction<Restaurant>(SELECT_RESTAURANT);

export type RootState = {
  selectedRestaurant?: Restaurant;
  selectedApplication?: Application;
  restaurants: Restaurant[];
};

const initialAppState: RootState = {
  selectedApplication: undefined,
  selectedRestaurant: undefined,
  restaurants: [],
};

const reducer = createReducer(initialAppState, {
  SELECT_RESTAURANT(state, action: PayloadAction<Restaurant>) {
    state.selectedRestaurant = action.payload;
  },
  SELECT_APPLICATION(state, action: PayloadAction<Application>) {
    state.selectedApplication = action.payload;
  },
  LOAD_RESTAURANTS(state, action: PayloadAction<Application[]>) {
    state.restaurants = reduceApplicationsIntoRestaurants(action.payload);
  },
});

export const store = configureStore({
  reducer,
});
