import { Application } from "../state/Application.model";
import { Restaurant } from "../state/Restaurant.model";

export  const reduceApplicationsIntoRestaurants = (apps: Application[]): Restaurant[] => {
	const restaurants: {[key:string]: Restaurant} = {};
	apps.forEach((currentApplication: Application) => {
		if(!restaurants[currentApplication.restaurant.id]) {
			restaurants[currentApplication.restaurant.id] = new Restaurant();
			restaurants[currentApplication.restaurant.id].id = currentApplication.restaurant.id;
			restaurants[currentApplication.restaurant.id].label =  currentApplication.restaurant.label;
			restaurants[currentApplication.restaurant.id].applications =[];
		}
			currentApplication.firstname = currentApplication.form_response.answers.find((answer)=> answer.field.ref === 'application_firstname')?.text;
			currentApplication.lastname = currentApplication.form_response.answers.find((answer)=> answer.field.ref === 'application_lastname')?.text;
			restaurants[currentApplication.restaurant.id].applications.push(currentApplication);
	});
	return Object.values(restaurants);
}
