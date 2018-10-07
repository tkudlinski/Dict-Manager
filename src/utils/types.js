// @flow

import * as React from "react";

export type DictionaryType = {};

export type CoreStateType = {
  dictionaries: Object
};

export type CoreActionsType = {
  createDict: () => void,
  updateDict: (dictId: string, dict: DictionaryType) => void,
  removeDict: (dictId: string) => void
};

export type CorePropsType = {
  children: React.Node
};

export type ErrorsType = {
  duplication: Array<string>,
  cycles: Array<string>,
  chains: Array<string>
} | null;
