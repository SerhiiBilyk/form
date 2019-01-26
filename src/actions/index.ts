import { Action, ActionCreator, AnyAction, Dispatch, Store } from "redux";
import { ThunkAction } from "redux-thunk";
import { requests } from "@api";

export enum Constants {
  INITIAL_ACTION = "INITIAL_ACTION",
  GET_TITLE_DUBLICATES = "GET_TITLE_DUBLICATES",
  GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS",
  GET_REQUEST_ERROR = "GET_REQUEST_ERROR"
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

export const getRequest = (name: string) => {
  return dispatch => {
    return requests[name]().then(response => {
      const { status } = response;
      const loaded = status === 200;
      if (loaded) {
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
      } else {
        dispatch({
          type: Constants.GET_REQUEST_ERROR,
          payload: {
            name,
            status
          }
        });
      }
    });
  };
};
/*
export const getTitleDublicates: Dublicates = (title: string) => {
  return dispatch => {
    return handleTitleDublicates().then(response => {
      return response.json().then(dublicates => {
        dispatch({
          type: Constants.GET_TITLE_DUBLICATES,
          payload: { dublicates }
        });
        return dublicates.some(elem => elem.title === title);
      });
    });
  };
};
*/
