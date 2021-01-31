import { Application } from "../state/Application.model";
import { Restaurant } from "../state/Restaurant.model";

export const findAndToggleApplicationInRestaurants = (restaurants: Restaurant[]|undefined, application: Application) => {
	let foundApplication: Application|undefined; // memoizing variable to prevent iterating over every restaurant
	const reducedRestaurants = restaurants?.reduce((reducedRestaurants: Restaurant[], restaurant: Restaurant)=>{
				let newRestaurant = {...restaurant};
				if(!foundApplication){
					foundApplication = newRestaurant.applications.find((oldApplication: Application)=> oldApplication.id === application.id);
					if (foundApplication) foundApplication.viewed = true;
				}
				reducedRestaurants.push(newRestaurant);
				return reducedRestaurants;
	}, []);
	return reducedRestaurants;
}