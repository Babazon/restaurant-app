import { Application } from "./Application.model"

export interface Restaurant {
	id: string
	label: string
	applications: Application[]
}