import type { Action, State } from "../store";

export type ScreenProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
