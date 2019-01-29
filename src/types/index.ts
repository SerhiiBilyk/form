export interface IApiData {
  data: any;
  loaded: boolean;
  selected: any;
  error: boolean;
}
export interface IEvent {
  title: string;
  description: string;
  category_id: number;
  paid_event: boolean;
  event_fee: number;
  reward: number;
  date: string; // YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
  duration: number; // in seconds
  coordinator: ICoordinator;
}

export interface IFormData {
  valid: boolean;
  value: any;
  message: string[];
}
export interface ICoordinator {
  email: string;
  id: string;
}

export type FormDataKeys =
  | "title"
  | "description"
  | "category_id"
  | "paid_event"
  | "event_fee"
  | "reward"
  | "date"
  | "duration"
  | "coordinator_email"
  | "coordinator_id"
  | "time"
  | "time_meridiem"
  | "time_duration"
export type IFormReducer = Record<FormDataKeys, IFormData>;
