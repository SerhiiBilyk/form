import { Action, ActionCreator, AnyAction, Dispatch, Store } from "redux";
import { ThunkAction } from "redux-thunk";
import { requests } from "@api";
import { IFormData } from "@types";

export enum Constants {
  INITIAL_ACTION = "INITIAL_ACTION",
  GET_TITLE_DUBLICATES = "GET_TITLE_DUBLICATES",
  GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS",
  GET_REQUEST_ERROR = "GET_REQUEST_ERROR",

  FORM_SET_VALUE = "FORM_SET_VALUE"
}

interface IState {
  name: string;
}
type ExtraArgument = void;
type Result = void;

type ActionFactory<A extends Action> = ThunkAction<
  Result,
  IState,
  ExtraArgument,
  A
>;

type InitialAction = Action<Constants.INITIAL_ACTION> & {
  payload: {
    id: string;
  };
};

export type Initial = (id: string) => ActionFactory<InitialAction>;

export const initial: Initial = (id: string) => (dispatch): InitialAction =>
  dispatch({
    type: Constants.INITIAL_ACTION,
    payload: {
      id
    }
  });

type GetTitleDublicatesAction = Action<Constants.GET_TITLE_DUBLICATES> & {
  payload: { dublicates: any[] };
};
type Dublicates = (title: string) => ActionFactory<GetTitleDublicatesAction>;

type GetRequestAction = Action<Constants.GET_REQUEST_SUCCESS> & {
  payload: {
    name: string;
  };
};
type GetRequest = (name: string) => ActionFactory<GetRequestAction>;

export const getRequest: GetRequest = (name: string) => dispatch =>
  requests[name]().then(response => {
    const { status } = response;
    return response.json().then(data => {
      dispatch({
        type: Constants.GET_REQUEST_SUCCESS,
        payload: {
          name,
          data,
          status
        }
      });
    });
  });

type FormSetValueAction = Action<Constants.FORM_SET_VALUE> & {
  payload: {
    name: string;
    data: IFormData;
  };
};
type FormSetValue = (
  name: string,
  data: IFormData
) => ActionFactory<FormSetValueAction>;

export const formSetValue: FormSetValue = (
  name: string,
  data: IFormData
) => dispatch =>
  dispatch({
    type: Constants.FORM_SET_VALUE,
    payload: {
      name,
      data
    }
  });
