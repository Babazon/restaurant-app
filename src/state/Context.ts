import React from 'react';
import { Application } from './Application.model';
import { Restaurant } from './Restaurant.model';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

export type IAppState = {
	selectedRestaurant?: Restaurant;
	selectedApplication?: Application;
	restaurants?: Restaurant[],
	selectRestaurant(restaurant?: Restaurant):void;
	selectApplication(application?:Application):void;
	toggleApplicationAsViewed(application: Application): void;
	loadRestaurants():void;
}


export const initialAppState : Partial<IAppState> = {
	selectedRestaurant: undefined,
	selectedApplication: undefined,
	restaurants: [],
}

const MyContext = React.createContext<Partial<IAppState>>({});

export default MyContext;