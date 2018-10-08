// @flow

import * as React from "react";

export type DictionaryItemType = {
  domain: string,
  range: string
};

export type DomainIdType = string;

export type DictionaryType = {};

export type DictionaryIdType = string;

export type CoreStateType = {
  dictionaries: {}
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
  forks: Array<string>,
  cycles: Array<string>,
  chains: Array<string>
} | null;
