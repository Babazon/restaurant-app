import { Application } from "../state/Application.model";
import { Restaurant } from "../state/Restaurant.model";

export  const reduceApplicationsIntoRestaurants = (apps: Application[]): Restaurant[] => {
	const restaurants: {[key:string]: Restaurant} = {};
	apps.forEach((currentApplication: Application) => {
		if(!restaurants[currentApplication.restaurant.id]) {
			restaurants[currentApplication.restaurant.id] = {id: currentApplication.restaurant.id, label: currentApplication.restaurant.label, applications: []};
		}
			restaurants[currentApplication.restaurant.id].applications.push(currentApplication);
	});
	return Object.values(restaurants);
}
