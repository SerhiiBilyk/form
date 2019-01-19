export const COMMUNICATOR_TOGGLE_CONNECTION = "COMMUNICATOR_TOGGLE_CONNECTION";

export const COMMUNICATOR_CLOSE_ACTIVE_CLIENT =
  "COMMUNICATOR_UNSET_ACTIVE_CLIENT";

export const COMMUNICATOR_SYNC_MESSAGES = "COMMUNICATOR_SYNC_MESSAGES";
export const COMMUNICATOR_ADD_MESSAGE = "COMMUNICATOR_ADD_MESSAGE";
export const COMMUNICATOR_TOGGLE_ASIDE_WINDOW =
  "COMMUNICATOR_TOGGLE_ASIDE_WINDOW";

export const INITIAL_ACTION = "INITIAL_ACTION";

import { Action, ActionCreator, AnyAction, Dispatch, Store } from "redux";
import { ThunkAction } from "redux-thunk";

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

type InitialAction = Action<
  typeof INITIAL_ACTION
> & {
  payload: {
    id: string;
  };
};

export type Initial = (
  id: string
) => ActionFactory<InitialAction>;

export const initial: Initial= (id: string) => (
  dispatch
): InitialAction =>
  dispatch({
    type: INITIAL_ACTION,
    payload: {
      id
    }
  });
