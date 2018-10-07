// @flow

import { createContext } from "react";
import type { CoreStateType, CoreActionsType } from "./types";

const { Provider: StateProvider, Consumer: StateConsumer } = createContext<
  CoreStateType
>({ dictionaries: {} });
const { Provider: ActionsProvider, Consumer: ActionsConsumer } = createContext<
  CoreActionsType
>({
  createDict: () => {},
  updateDict: () => {},
  removeDict: () => {}
});

export { StateProvider, StateConsumer, ActionsProvider, ActionsConsumer };
