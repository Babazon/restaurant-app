import { Restaurant } from "./Restaurant.model";

export class Application {
	firstname?: string
	lastname?: string
	viewed: boolean = false
	id: string
	event_id: string
	event_type: string // enum,
	restaurant: Restaurant // circular but ok for now
	form_response: FormResponse
}

export class FormResponse {
	form_id: string
	token: string
	landed_at: string
	submitted_at: string
	definition: FormDefinition
	answers: FormAnswer[]
}


export class FormAnswer {
	field: {
		id: string,
		ref: string,
		type: string
  }
	text: string
	type: string
}

export class FormDefinition {
	id: string
	title: string
	fields: FormField[]
}

export class FormField {
	allow_multiple_selections: boolean
	allow_other_choice: boolean
	choices: { id: string, label: string }[]
	id: string
	properties: any // No example to type
	ref: string
	title: string
	type: string
}