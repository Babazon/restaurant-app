import {Restaurant} from './Restaurant.model';

export interface Application {
  firstname?: string;
  lastname?: string;
  id: string;
  event_id: string;
  event_type: string; // enum,
  restaurant: Restaurant; // circular but ok for now
  form_response: FormResponse;
}

export interface FormResponse {
  form_id: string;
  token: string;
  landed_at: string;
  submitted_at: string;
  definition: FormDefinition;
  answers: FormAnswer[];
}

export interface FormAnswer {
  field: {
    id: string;
    ref: string; // should be typed
    type: string;
  };
  text: string;
  type: string;
}

export interface FormDefinition {
  id: string;
  title: string;
  fields: FormField[];
}

export interface FormField {
  allow_multiple_selections: boolean;
  allow_other_choice: boolean;
  choices: {id: string; label: string}[];
  id: string;
  properties: any; // No example to type
  ref: string;
  title: string;
  type: string;
}
