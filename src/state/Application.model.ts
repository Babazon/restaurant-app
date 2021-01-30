import { Restaurant } from "./Restaurant.model";

export class Application {
	firstname?: string
	lastname?: string
	viewed: boolean = false
	id: string
	event_id: string
	event_type: string // enum,
	restaurant: Restaurant
	form_response: {
		form_id: string,
		token: string,
		landed_at: string,
		submitted_at:string,
		definition: {
			id: string,
			title: string,
			fields: { allow_multiple_selections: boolean, allow_other_choice: boolean, 	choices: { 	id: string, label: string }[], id: string, properties: {}, 	ref: string, 	title: string, 	type: string }[],
		},
		answers: { field: { 	id: string, 	ref: string, 	type: string	}, 	text: string,type: string	}[],
	}
}